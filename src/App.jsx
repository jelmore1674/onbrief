import { relaunch } from '@tauri-apps/api/process';
  import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { UpdateModal } from './components/UpdateModal';
import { Layout } from './layout/layout';
import routes from './routes';
import { Fleet, Jobs, Settings } from './screens';
import { Dispatch } from './screens/Dispatch';
import { fetchFleet } from './store/slices/fleet';
import { fetchJobs } from './store/slices/jobs';
import { createAllDirectories } from './utils/createDirectories';
import { RUNNING_IN_TAURI } from './utils/updater';

const ONE_HOUR = 3600000;

export default function App() {
	const { world } = useSelector((state) => state.world);
	const { savedTokens, ...tokens } = useSelector((state) => state.tokens);
	const dispatch = useDispatch();

	useEffect(() => {
		createAllDirectories();
		// getApiTokens().then((tokens) => {
		// 	dispatch(updateToken({ ...tokens, savedTokens: tokens }));
		// });
	}, []);

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
			const checkForUpdate = setInterval(() => {
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
			}, ONE_HOUR);

			return () => clearInterval(checkForUpdate);
		}, []);
	}

	useEffect(() => {
		if (tokens[world].apiKey !== '') {
			const intervalId = setInterval(() => {
				dispatch(fetchJobs(tokens[world]));
				dispatch(fetchFleet(tokens[world]));
			}, 10000);
			return () => clearInterval(intervalId);
		}
	}, [world]);

	return (
		<Router>
			<Layout>
				<Routes>
					<Route path={routes.VA_JOBS} element={<Jobs />} />
					<Route path={routes.HOME} element={<Jobs />} />
					<Route path={routes.FLEET} element={<Fleet />} />
					<Route path={routes.SETTINGS} element={<Settings />} />
					<Route path={routes.DISPATCH} element={<Dispatch />} />
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
