import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
	aircraftDataReducer,
	fleetReducer,
	jobReducer,
	modalReducer,
	toastReducer,
	tokenReducer,
} from './slices';

const rootReducer = combineReducers({
	tokens: tokenReducer,
	jobs: jobReducer,
	fleet: fleetReducer,
	toast: toastReducer,
	aircraftData: aircraftDataReducer,
	modal: modalReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
