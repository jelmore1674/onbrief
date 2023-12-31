import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';
import { getApiTokens } from './utils';
import { writeLog } from '../../utils';

export const companyApi = axios.create({
	adapter: axiosTauriAdapter,
	baseURL: 'https://server1.onair.company/api/v1/company',
});

async function getJobs({ apiKey, companyId }) {
	const { data } = await companyApi.get(`/${companyId}/jobs/pending`, {
		headers: {
			'oa-apikey': apiKey,
			'Access-Control-Allow-Origin': '*',
			Accept: 'application/json',
		},
	});
	return data;
}

export async function getFleet({ apiKey, companyId }) {
	const { data } = await companyApi.get(`/${companyId}/fleet`, {
		headers: {
			'oa-apikey': apiKey,
			'Access-Control-Allow-Origin': '*',
			Accept: 'application/json',
		},
	});

	const fleet = data.Content.reduce((acc, aircraft) => {
		const {
			Id,
			AircraftLease,
			AircraftType,
			CurrentAirport,
			ConfigFirstSeats,
			ConfigBusSeats,
			ConfigEcoSeats,
			CurrentCompanyId,
			CurrentSeats,
			HoursBefore100HInspection,
			TotalWeightCapacity,
			Identifier,
		} = aircraft;

		const aircraftConfig = {
			id: Id,
			leaseExpiration: AircraftLease?.EndDate,
			aircraftType: AircraftType.DisplayName,
			standardSeatWeight: AircraftType.StandardSeatWeight,
			maximumCargoWeight: AircraftType.maximumCargoWeight,
			maximumGrossWeight: AircraftType.maximumGrossWeight,
			maxSeatCapacity: AircraftType.seats,
			currentAirport: CurrentAirport?.ICAO,
			currentSeats: CurrentSeats,
			firstClassSeats: ConfigFirstSeats,
			businessClassSeats: ConfigBusSeats,
			economySeats: ConfigEcoSeats,
			hoursBefore100HourInspection: HoursBefore100HInspection,
			totalWeightCapacity: TotalWeightCapacity,
			registration: Identifier,
			vaAircraft: CurrentCompanyId !== companyId,
		};

		return [...acc, aircraftConfig];
	}, []);

	return fleet;
}

/**
 * Gets the jobs and sets the data in a way that I will use
 * @returns {object}
 */
export async function getJobData(tokens) {
	try {
		// Get the jobs form the OnAir api
		const { Content } = await getJobs(tokens);

		// filter the jobs and organize to usable data structure
		const jobs = Content.reduce((acc, job) => {
			const legs = job.Cargos.reduce((cargoAcc, cargo) => {
				const pax = job.Charters.find(
					(pax) =>
						pax.DepartureAirport.ICAO ===
							cargo.DepartureAirport.ICAO &&
						pax.DestinationAirport.ICAO ===
							cargo.DestinationAirport.ICAO
				);

				const leg = {
					departureAirport: cargo.DepartureAirport.ICAO,
					arrivalAirport: cargo.DestinationAirport.ICAO,
					cargo: cargo.Weight,
					pax: pax?.PassengersNumber ?? 0,
					distance: cargo.Distance,
				};

				if (leg.distance) {
					return [...cargoAcc, leg];
				}

				return cargoAcc;
			}, []);

			const fullJob = {
				id: job.Id,
				legs,
				companyId: job.CompanyId,
				totalDistance: job.TotalDistance,
				expires: job.ExpirationDate,
				missionType: job.MissionType.Name,
				missionDescription: job.MissionType.Description,
				mainAirport: job.MainAirportId,
				baseAirport: job.BaseAirportId,
			};

			if (!legs) {
				return acc;
			}

			return [...acc, fullJob];
		}, []);

		const sortedJobs = jobs.sort((a, b) => {
			let dateA = new Date(a.expires);
			let dateB = new Date(b.expires);
			if (a.expires === undefined) {
				dateA = new Date();
			}
			if (b.expires === undefined) {
				dateB = new Date();
			}
			return dateA - dateB;
		});

		const companyJobs = sortedJobs.filter(
			(job) => job.companyId === tokens.companyId
		);

		const levelJobs = companyJobs.filter(
			(job) => job.expires === undefined
		);
		const pendingJobs = companyJobs.filter(
			(job) => job.expires !== undefined
		);
		const vaJobs = sortedJobs.filter(
			(job) => job.companyId !== tokens.companyId
		);

		return {
			vaJobs,
			jobs: [...pendingJobs, ...levelJobs],
		};
	} catch (e) {
		writeLog(JSON.stringify({ getJobData: e.message }));
		return { jobs: [], vaJobs: [] };
	}
}
