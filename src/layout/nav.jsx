import { Navbar, Text } from '@nextui-org/react';
import { FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useHref } from 'react-router-dom';
import routes from '../routes';
import { useDispatch } from 'react-redux';
import { fetchJobs } from '../store/slices/jobs';

export function Nav() {
	const currentRoute = useHref();
	const dispatch = useDispatch();

	const checkIfActiveRoute = (route) => {
		return route === currentRoute;
	};

	return (
		<Navbar isBordered variant={'sticky'}>
			<Navbar.Brand as={NavLink} to='/'>
				<Text>OnBrief</Text>
			</Navbar.Brand>
			<Navbar.Content justify='space-between'>
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
