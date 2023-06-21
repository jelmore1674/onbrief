import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { Layout } from './layout/layout';
import routes from './routes';
import { Fleet, Jobs, Settings } from './screens';

export default function App() {
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
