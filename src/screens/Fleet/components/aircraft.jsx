import { Card, Grid, Text } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../store/slices/modal';

export const Aircraft = ({ aircraft, setNewIcao, setIcao }) => {
	const { aircraftIcao } = useSelector((state) => state.aircraftData);
	const dispatch = useDispatch();
	const handlePress = () => {
		setNewIcao(aircraft.aircraftType);
		const icao = aircraftIcao[aircraft.aircraftType];
		if (icao) {
			setIcao(icao);
		}
		dispatch(openModal());
	};
	return (
		<Grid xs={6}>
			<Card
				borderWeight='bold'
				isPressable
				onPress={handlePress}
				css={{ border: aircraft.vaAircraft && '1px solid $success' }}>
				<Card.Header>
					<Text h3>{aircraft.aircraftType}</Text>
				</Card.Header>
				<Card.Divider />
				<Card.Body>
					<Text b>Registration: {aircraft.registration}</Text>
					<Text b>
						Current Airport: {aircraft.currentAirport ?? 'In Air'}
					</Text>
				</Card.Body>
			</Card>
		</Grid>
	);
};
