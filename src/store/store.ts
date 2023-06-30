import {
	AnyAction,
	Store,
	ThunkDispatch,
	combineReducers,
	configureStore,
	createAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
	aircraftDataReducer,
	fleetReducer,
	jobReducer,
	modalReducer,
	simbriefReducer,
	toastReducer,
	tokenReducer,
	worldReducer,
} from './slices';

const appReducer = combineReducers({
	tokens: tokenReducer,
	jobs: jobReducer,
	fleet: fleetReducer,
	toast: toastReducer,
	aircraftData: aircraftDataReducer,
	modal: modalReducer,
	world: worldReducer,
	simbrief: simbriefReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_STATE') {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

const persistConfig = {
	key: 'root',
	storage,
};

export const resetState = createAction('RESET_STATE');

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
	dispatch: AppThunkDispatch;
};

export const store: AppStore = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
