import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import { getData } from './lib/onair';
import { Leg } from './components/legs';
import { Card, Container } from '@nextui-org/react';

function MainScreen() {
	const [query, setQuery] = useState('');
	async function fetchData() {
		const data = await getData();
		return data;
	}

	useEffect(() => {
		fetchData().then((data) => setQuery(data));
	}, []);

	if (query !== '') {
		const { job, jobs, fleet } = query;
		const acdata = {
			maxpax: fleet.AircraftType.seats,
			maxcargo: fleet.AircraftType.maximumCargoWeight,
			paxwgt: 190,
			bagwgt: 0,
		};
		return (
			<Container justify='center' alignItems='center'>
				{jobs?.map((job) => (
					<Card key={job} css={{ marginBlock: 32 }}>
						<Card.Header>
							<a href='/test' style={{ color: 'black' }}>
								Go to test
							</a>
							{job.missionType} |{' '}
							{job?.legs &&
								`${job.legs[0].departureAirport}-${job.legs[0].arrivalAirport}`}
						</Card.Header>
						<Card.Body>
							{job?.legs &&
								job?.legs.map((leg, i) => (
									<Leg leg={leg} key={i} acdata={acdata} />
								))}
						</Card.Body>
					</Card>
				))}
			</Container>
		);
	}

	return (
		<div className='container'>
			<h1 style={{ color: 'white' }}>TEST</h1>
		</div>
	);
}

const Test = () => {
	return (
		<Container>
			<Text>Hiii</Text>
			<a href='/'></a>
		</Container>
	);
};

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainScreen />} />
				<Route path='/test' element={<Test />} />
			</Routes>
		</Router>
	);
}
