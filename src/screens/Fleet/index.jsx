import { Card, Container, Grid, Loading, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Aircraft } from './components';
import { IcaoModal } from '../../components/modal';
import { updateAircraftIcao } from '../../store/slices/aircraftData';
import { closeModal } from '../../store/slices/modal';

export const Fleet = () => {
	const { fleet, loading, error } = useSelector((state) => state.fleet);

	const dispatch = useDispatch();
	const [icao, setIcao] = useState('');
	const [newIcao, setNewIcao] = useState('');

	const saveIcao = () => {
		dispatch(updateAircraftIcao({ [newIcao]: icao }));
		dispatch(closeModal());
		setIcao('');
		setNewIcao('');
	};

	if (!fleet && !loading) {
		return <></>;
	}

	const plane = fleet[0];

	return (
		<>
			<Container
				justify='center'
				alignItems='center'
				css={{ marginBlock: 16 }}>
				{!fleet.length || loading ? (
					<Row justify='center' alignItems='center'>
						<Loading
							size='xl'
							css={{ alignSelf: 'center', justifySelf: 'center' }}
						/>
					</Row>
				) : (
					<Grid.Container gap={2}>
						{fleet.map((aircraft) => (
							<Aircraft
								aircraft={aircraft}
								setNewIcao={setNewIcao}
								setIcao={setIcao}
							/>
						))}
					</Grid.Container>
				)}
			</Container>
			<IcaoModal
				update
				newIcao={newIcao}
				icao={icao}
				setIcao={setIcao}
				saveIcao={saveIcao}
			/>
		</>
	);
};
