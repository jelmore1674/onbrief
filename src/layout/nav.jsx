import { Navbar, Text } from '@nextui-org/react';
import { FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export function Nav() {
	return (
		<Navbar isBordered variant={'sticky'}>
			<Navbar.Brand as={NavLink} to='/'>
				<Text>OnBrief</Text>
			</Navbar.Brand>
			<Navbar.Content>
				<Navbar.Item as={NavLink} to='/settings'>
					<FaCog color='white' />
				</Navbar.Item>
			</Navbar.Content>
		</Navbar>
	);
}
