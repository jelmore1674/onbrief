import {
	Button,
	Container,
	Input,
	Link,
	Modal,
	Row,
	Spacer,
	Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
	selectAircraft,
	updateAircraftIcao,
} from '../store/slices/aircraftData';
import { IcaoModal } from './modal';
import { openModal, closeModal } from '../store/slices/modal';

export const Leg = ({
	leg,
	acdata,
	icao,
	setIcao,
	selectedIcao,
	setSelectedIcao,
	newIcao,
	setNewIcao,
}) => {
	const { fleet } = useSelector((state) => state.fleet);
	const { aircraftIcao, selectedAircraft } = useSelector(
		(state) => state.aircraftData
	);
	const [selectOptions, setSelectOptions] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const options = fleet.reduce((acc, aircraft) => {
			const airport = aircraft.currentAirport
				? aircraft.currentAirport
				: 'In Air';
			const option = {
				value: aircraft.id,
				label: `${aircraft.aircraftType} | ${airport}`,
			};

			if (leg.departureAirport === airport) {
				return [...acc, option];
			}

			return acc;
		}, []);

		setSelectOptions(options);
	}, [fleet]);

	const handleChange = ({ value }) => {
		const aircraft = fleet.find((aircraft) => aircraft.id === value);
		const foundIcao = Object.keys(aircraftIcao).find(
			(plane) => plane === aircraft.aircraftType
		);
		if (!foundIcao) {
			setNewIcao(aircraft.aircraftType);
			if (newIcao !== '') {
				dispatch(openModal());
			}
		}

		setSelectedIcao(aircraftIcao[foundIcao]);

		const data = {
			maxpax: aircraft.maxSeatCapacity,
			maxcargo: aircraft.maximumCargoWeight / 1000,
			paxwgt: 190,
			bagwgt: 0,
			reg: aircraft.registration,
		};

		dispatch(selectAircraft(data));
	};

	return (
		<Container css={{ marginBottom: 16 }}>
			<Row justify='space-between' align='center' css={{ width: '100%' }}>
				<Select
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							minWidth: 300,
							maxWidth: 300,
							color: 'black',
						}),
						option: (baseStyles, state) => ({
							...baseStyles,
							color: 'black',
						}),
					}}
					onChange={handleChange}
					options={selectOptions}
					noOptionsMessage={() => 'No aircraft at departure'}
				/>

				<Text b>{`${leg.departureAirport}-${leg.arrivalAirport}`}</Text>

				<a
					href={`https://dispatch.simbrief.com/options/custom?reg=${
						selectedAircraft.reg
					}&type=${selectedIcao}&orig=${leg.departureAirport}&dest=${
						leg.arrivalAirport
					}&cargo=${(leg.cargo / 1000).toFixed(3)}&pax=${
						leg.pax
					}&acdata=${JSON.stringify(selectedAircraft)}`}
					target='_blank'>
					<img src='http://www.simbrief.com/previews/sblogo_small.png' />
				</a>
			</Row>
		</Container>
	);
};
