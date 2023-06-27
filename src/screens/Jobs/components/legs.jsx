import { Container, Dropdown, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAircraft } from '../../../store/slices/aircraftData';
import { openModal } from '../../../store/slices/modal';

export const Leg = ({
	leg,
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

	const [aircraft, setAircraft] = useState(null);

	useEffect(() => {
		const options = fleet.reduce((acc, aircraft) => {
			const airport = aircraft.currentAirport
				? aircraft.currentAirport
				: 'In Air';
			const option = {
				maxCargo: aircraft.maximumCargoWeight,
				economySeats: aircraft.economySeats,
				businessClassSeats: aircraft.businessClassSeats,
				firstClassSeats: aircraft.firstClassSeats,
				registration: aircraft.registration,
				value: aircraft.id,
				label: aircraft.aircraftType,
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
		setAircraft(aircraft.aircraftType);
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
				<Dropdown>
					<Dropdown.Button
						disabled={selectOptions.length === 0}
						css={{ minWidth: 250 }}>
						{aircraft ?? 'Select Aircraft'}
					</Dropdown.Button>
					<Dropdown.Menu
						items={selectOptions}
						onAction={(value) => handleChange({ value })}>
						{(aircraft) => {
							return (
								<Dropdown.Item
									key={aircraft.value}
									description={`${aircraft.economySeats}/${
										aircraft.businessClassSeats
									}/${aircraft.firstClassSeats}   ${
										aircraft.registration
									}    ${aircraft.maxCargo.toLocaleString()} lbs`}>
									{aircraft.label}
								</Dropdown.Item>
							);
						}}
					</Dropdown.Menu>
				</Dropdown>

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
			<Row css={{ marginBlock: 16 }} justify='flex-start'>
				<Container>
					<Row>
						<Text b>Cargo</Text>
					</Row>
					<Row>
						<Text>{leg?.cargo.toFixed(0).toLocaleString()}</Text>
					</Row>
				</Container>
				<Container>
					<Row>
						<Text b>Pax</Text>
					</Row>
					<Row>
						<Text>{leg?.pax}</Text>
					</Row>
				</Container>
				<Container>
					<Row>
						<Text b>Distance</Text>
					</Row>
					<Row>
						<Text>{leg?.distance.toLocaleString()}</Text>
					</Row>
				</Container>
			</Row>
		</Container>
	);
};
