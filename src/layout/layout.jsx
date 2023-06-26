import { Container, Loading, Row, Spacer } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHref } from 'react-router-dom';
import { Box } from './components/box';
import { Toast } from './components/toast';
import { Nav } from './nav';

export const Layout = ({ children }) => {
	const path = useHref();
	const { world } = useSelector((state) => state.world);

	const [pageChange, setPageChange] = useState(false);

	// UseEffect to force a rerender whenver the route changes
	useEffect(() => {
		setPageChange(true);
		const newWorld = setTimeout(() => {
			setPageChange(false);
		}, 650);
		return () => clearTimeout(newWorld);
	}, [path, world]);

	return (
		<Box>
			<Nav />
			<Spacer y={1} />
			{pageChange ? (
				<Container>
					<Row justify='center' alignItems='center'>
						<Loading
							size='xl'
							css={{ alignSelf: 'center', justifySelf: 'center' }}
						/>
					</Row>
				</Container>
			) : (
				children
			)}
			<Toast />
		</Box>
	);
};
