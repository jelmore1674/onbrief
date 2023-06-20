import { useEffect, useRef, useState } from 'react';
import {
	MemoryRouter as Router,
	Routes,
	Route,
	Link,
	NavLink,
} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import { getData } from './lib/onair';
import { Leg } from './components/legs';
import {
	Card,
	Container,
	Loading,
	Navbar,
	Row,
	Spacer,
	Text,
} from '@nextui-org/react';
import { FaCog } from 'react-icons/fa';

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
			{isLoading || true ? (
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
								<Link to='/test' style={{ color: 'black' }}>
									Go to test
								</Link>
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

const Settings = () => {
	return (
		<Container>
			<Link to='/'>
				<h1>Settings</h1>
			</Link>
		</Container>
	);
};

export default function App() {
	return (
		<Router>
			<Navbar isBordered variant={'sticky'}>
				<Navbar.Brand>
					<Text>OnAir Simbrief Tool</Text>
				</Navbar.Brand>
				<Navbar.Content>
					<Navbar.Item as={NavLink} to='/settings'>
						<FaCog />
					</Navbar.Item>
				</Navbar.Content>
			</Navbar>
			<Spacer y={2} />
			<Routes>
				<Route path='/' element={<MainScreen />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>
		</Router>
	);
}
