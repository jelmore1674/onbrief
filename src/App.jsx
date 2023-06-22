import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './layout/layout';
import routes from './routes';
import { Fleet, Jobs, Settings } from './screens';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchJobs } from './store/slices/jobs';
import { fetchFleet } from './store/slices/fleet';

export default function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch(fetchJobs());
			dispatch(fetchFleet());
		}, 60000);

		return () => clearInterval(intervalId);
	}, []);
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path={routes.HOME} element={<Jobs />} />
					<Route path={routes.FLEET} element={<Fleet />} />
					<Route path={routes.SETTINGS} element={<Settings />} />
				</Routes>
			</Layout>
		</Router>
	);
}
