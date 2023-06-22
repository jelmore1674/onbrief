import { Card, Grid, Text } from '@nextui-org/react';

export const Aircraft = ({ aircraft }) => {
	return (
		<Grid xs={6}>
			<Card>
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
