import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './layout/layout';
import routes from './routes';
import { Fleet, Jobs, Settings } from './screens';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from './store/slices/jobs';
import { fetchFleet } from './store/slices/fleet';
import { createAllDirectories } from './utils/createDirectories';
import * as tauriEvent from '@tauri-apps/api/event';
import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { BaseDirectory, downloadDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api';
import { getApiTokens } from './lib/onair/utils';
import { updateToken } from './store/slices/tokens';
import { RUNNING_IN_TAURI } from './utils/updater';
import { UpdateModal } from './components/UpdateModal';

export default function App() {
	const { world } = useSelector((state) => state.world);
	const { savedTokens, ...tokens } = useSelector((state) => state.tokens);
	const { loading } = useSelector((state) => state.jobs);
	const dispatch = useDispatch();

	useEffect(() => {
		createAllDirectories();
		// getApiTokens().then((tokens) => {
		// 	dispatch(updateToken({ ...tokens, savedTokens: tokens }));
		// });
	}, []);

	const mountID = useRef(null);
	const unlistens = useRef({});

	const [modalContent, setModalContent] = useState(null);
	const [showModal, setShowModal] = useState(null);
	const [isInstalling, setIsInstalling] = useState(false);

	function startInstall() {
		setIsInstalling(true);
		installUpdate().then(relaunch);
	}

	// Tauri event listeners (run on mount)
	if (RUNNING_IN_TAURI) {
		useEffect(() => {
			const thisMountID = Math.random();
			mountID.current = thisMountID;
			checkUpdate().then(({ shouldUpdate, manifest }) => {
				if (shouldUpdate) {
					const { version: newVersion, body } = manifest;

					setModalContent({
						header: newVersion,
						body,
					});
					setShowModal(true);
				}
			});

			return () => (mountID.current = null);
		}, []);
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch(fetchJobs(tokens[world]));
			dispatch(fetchFleet(tokens[world]));
		}, 10000);

		return () => clearInterval(intervalId);
	}, [world]);

	return (
		<Router>
			<Layout>
				<Routes>
					<Route path={routes.VA_JOBS} element={<Jobs />} />
					<Route path={routes.HOME} element={<Jobs />} />
					<Route path={routes.FLEET} element={<Fleet />} />
					<Route path={routes.SETTINGS} element={<Settings />} />
				</Routes>
				{modalContent && (
					<UpdateModal
						open={showModal}
						onClose={() => setShowModal(false)}
						action={startInstall}
						isInstalling={isInstalling}
						{...modalContent}
					/>
				)}
			</Layout>
		</Router>
	);
}
