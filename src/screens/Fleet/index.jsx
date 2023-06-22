import { Card, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Aircraft } from './components';

export const Fleet = () => {
	const { fleet, loading, error } = useSelector((state) => state.fleet);

	if (!fleet && !loading) {
		return <></>;
	}

	const plane = fleet[0];

	return (
		<Container
			justify='center'
			alignItems='center'
			css={{ marginBlock: 16 }}>
			{!fleet.length && loading ? (
				<Row justify='center' alignItems='center'>
					<Loading
						size='xl'
						css={{ alignSelf: 'center', justifySelf: 'center' }}
					/>
				</Row>
			) : (
				<Grid.Container gap={2}>
					{fleet.map((aircraft) => (
						<Aircraft aircraft={aircraft} />
					))}
				</Grid.Container>
			)}
		</Container>
	);
};
