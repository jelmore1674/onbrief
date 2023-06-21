import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const darkTheme = createTheme({
	type: 'dark',
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NextUIProvider theme={darkTheme}>
					<App />
				</NextUIProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
