import { Container } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export const Settings = () => {
	return (
		<Container>
			<Link to='/'>
				<h1>Settings</h1>
			</Link>
		</Container>
	);
};
