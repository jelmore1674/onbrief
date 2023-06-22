import { Spacer } from '@nextui-org/react';
import { Box } from './components/box';
import { Nav } from './nav';
import { Toast } from './components/toast';

export const Layout = ({ children }) => (
	<Box>
		<Nav />
		<Spacer y={1} />
		{children}
		<Toast />
	</Box>
);
