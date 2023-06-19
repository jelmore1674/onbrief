export * from './aircrafts';
export * from './company';
import { getFleet } from './aircrafts';
import { getJobs } from './company';

export async function getData() {
	try {
		const { Content } = await getJobs();
		let job = {};

		const fleet = await getFleet();

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
				totalDistance: job.TotalDistance,
				expires: job.ExpirationDate,
				missionType: job.MissionType.Name,
				missionDescription: job.MissionType.Description,
				mainAirport: job.MainAirportId,
				baseAirport: job.BaseAirportId,
			};

			return [...acc, fullJob];
		}, []);

		job = {
			totalDistance: Content[3].TotalDistance,
			expires: Content[3].ExpirationDate,
			departureAirport: Content[3].Cargos[0].DepartureAirport.ICAO,
			arrivalAirport: Content[3].Cargos[0].DestinationAirport.ICAO,
			cargo: Content[3].Cargos[0].Weight,
			pax: Content[3].Charters[0].PassengersNumber,
		};

		return { job, jobs, fleet };
	} catch (e) {
		console.log({ e });
		return {};
	}
}
