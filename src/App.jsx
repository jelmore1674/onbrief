import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { getData } from './lib/onair';
import { Leg } from './components/legs';
import { Card, Container, Loading, Row, Spacer } from '@nextui-org/react';
import { Nav } from './layout/nav';
import { Settings } from './screens/Settings';

function MainScreen() {
	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	async function fetchData() {
		const data = await getData();
		return data;
	}

	useEffect(() => {
		setIsLoading(true);
		fetchData().then((data) => {
			setQuery(data);
			setIsLoading(false);
		});
	}, []);

	const { job, jobs, fleet } = query;
	const acdata = {
		maxpax: fleet?.AircraftType?.seats,
		maxcargo: fleet?.AircraftType?.maximumCargoWeight,
		paxwgt: 190,
		bagwgt: 0,
	};
	return (
		<Container justify='center' alignItems='center'>
			{isLoading ? (
				<Row justify='center' alignItems='center'>
					<Loading
						size='xl'
						css={{ alignSelf: 'center', justifySelf: 'center' }}
					/>
				</Row>
			) : (
				<>
					{jobs?.map((job) => (
						<Card key={job} css={{ marginBlock: 32 }}>
							<Card.Header>
								{job.missionType} |{' '}
								{job?.legs &&
									`${job.legs[0].departureAirport}-${job.legs[0].arrivalAirport}`}
							</Card.Header>
							<Card.Body>
								{job?.legs &&
									job?.legs.map((leg, i) => (
										<Leg
											leg={leg}
											key={i}
											acdata={acdata}
										/>
									))}
							</Card.Body>
						</Card>
					))}
				</>
			)}
		</Container>
	);
}

export default function App() {
	return (
		<Router>
			<Nav />
			<Spacer y={2} />
			<Routes>
				<Route path='/' element={<MainScreen />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>
		</Router>
	);
}
