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

export const Leg = ({ leg, acdata }) => {
	const [showModal, setShowModal] = useState(false);
	const [icao, setIcao] = useState('');
	const [selectedIcao, setSelectedIcao] = useState('');
	const [newIcao, setNewIcao] = useState('');
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
			setShowModal(true);
			setNewIcao(aircraft.aircraftType);
		}

		setSelectedIcao(aircraftIcao[foundIcao]);

		const data = {
			maxpax: aircraft.maxSeatCapacity,
			maxcargo: aircraft.maxCagoWeight / 1000,
			paxwgt: 190,
			bagwgt: 0,
			reg: aircraft.registration,
		};

		dispatch(selectAircraft(data));
	};

	const saveIcao = () => {
		dispatch(updateAircraftIcao({ [newIcao]: icao }));
		setSelectedIcao(icao);
		setShowModal(false);
		setIcao('');
		setNewIcao('');
	};

	console.log({ selectAircraft });

	const closeModal = () => setShowModal(false);
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
					}&cargo=${leg.cargo / 1000}&pax=${
						leg.pax
					}&acdata=${JSON.stringify(selectedAircraft)}`}
					target='_blank'>
					<img src='http://www.simbrief.com/previews/sblogo_small.png' />
				</a>
			</Row>
			<Modal
				blur
				aria-labelledby='modal-title'
				open={showModal}
				onClose={closeModal}>
				<Modal.Header>
					<Text h2>Enter Plane ICAO</Text>
				</Modal.Header>
				<Modal.Body>
					<Text h3>{newIcao}</Text>
					<Spacer y={0.5} />
					<Input
						underlined
						labelPlaceholder='Plane ICAO (ex. B738, A32N, B350)'
						initialValue={icao}
						onChange={(e) => setIcao(e.target.value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onPress={saveIcao}>
						<Text>Save ICAO</Text>
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};
