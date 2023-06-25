import { Dropdown, Navbar, Text } from '@nextui-org/react';
import { FaCog } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useHref } from 'react-router-dom';
import routes from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/slices/jobs';
import { updateWorld } from '../store/slices/world';

export function Nav() {
	const currentRoute = useHref();
	const navigate = useNavigate();
	const { world } = useSelector((state) => state.world);
	const { vaJobs } = useSelector((state) => state.jobs);
	const dispatch = useDispatch();

	const checkIfActiveRoute = (route) => {
		return route === currentRoute;
	};

	const handleWorldChange = (key) => {
		dispatch(updateWorld(key));
		// navigate('/');
	};

	return (
		<Navbar isBordered variant={'sticky'}>
			<Navbar.Content>
				<Navbar.Brand as={NavLink} to='/'>
					<Text>OnBrief</Text>
				</Navbar.Brand>

				<Dropdown>
					<Dropdown.Button
						css={{ textTransform: 'capitalize', minWidth: 119 }}>
						{world}
					</Dropdown.Button>
					<Dropdown.Menu onAction={(key) => handleWorldChange(key)}>
						<Dropdown.Item key='stratus'>Stratus</Dropdown.Item>
						<Dropdown.Item key='thunder'>Thunder</Dropdown.Item>
						<Dropdown.Item key='cumulus'>Cumulus</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Navbar.Content>
			<Navbar.Content justify='flex-start' css={{ minWidth: 250 }}>
				{vaJobs?.length > 0 && (
					<Navbar.Link
						isActive={checkIfActiveRoute(routes.VA_JOBS)}
						activeColor='success'
						onPress={() => dispatch(fetchJobs())}
						as={NavLink}
						to={routes.VA_JOBS}
						variant='underline'>
						VA Jobs
					</Navbar.Link>
				)}
				<Navbar.Link
					isActive={checkIfActiveRoute(routes.HOME)}
					activeColor='primary'
					onPress={() => dispatch(fetchJobs())}
					as={NavLink}
					to='/'
					variant='underline'>
					Jobs
				</Navbar.Link>
				<Navbar.Link
					isActive={checkIfActiveRoute(routes.FLEET)}
					activeColor='primary'
					as={NavLink}
					to='/fleet'
					variant='underline'>
					Fleet
				</Navbar.Link>
			</Navbar.Content>
			<Navbar.Content>
				<Navbar.Item as={NavLink} to='/settings'>
					<FaCog
						color={
							checkIfActiveRoute(routes.SETTINGS)
								? 'inherit'
								: 'white'
						}
					/>
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	);
}
