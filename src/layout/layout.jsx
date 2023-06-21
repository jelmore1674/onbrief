import { Spacer } from '@nextui-org/react';
import { Box } from './components/box';
import { Nav } from './nav';

export const Layout = ({ children }) => (
	<Box>
		<Nav />
		<Spacer y={2} />
		{children}
	</Box>
);
