import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './layout/layout';
import routes from './routes';
import { Fleet, Jobs, Settings } from './screens';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from './store/slices/jobs';
import { fetchFleet } from './store/slices/fleet';
import { createAllDirectories } from './utils/createDirectories';
import { BaseDirectory, downloadDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api';
import { getApiTokens } from './lib/onair/utils';
import { updateToken } from './store/slices/tokens';

export default function App() {
	const { savedTokens } = useSelector((state) => state.tokens);
	const { loading } = useSelector((state) => state.jobs);
	const dispatch = useDispatch();

	useEffect(() => {
		createAllDirectories();
		getApiTokens().then((tokens) => {
			dispatch(updateToken({ ...tokens, savedTokens: tokens }));
		});
	}, []);

	useEffect(() => {
		if (!loading) {
			dispatch(fetchJobs());
			dispatch(fetchFleet());
		}
	}, [savedTokens]);

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
