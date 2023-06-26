import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFleet, getJobData } from '../../lib/onair';
import { writeLog } from '../../utils';

export const fetchFleet = createAsyncThunk(
	'fleet/fetch',
	async (tokens, { rejectWithValue }) => {
		try {
			const response = await getFleet(tokens);
			return response;
		} catch (e) {
			writeLog(JSON.stringify({ fetchFleet: e }));
			return rejectWithValue('check api key');
		}
	}
);

const initialState = {
	fleet: [],
	aircraftData: [],
	world: '',
	loading: false,
	error: null,
};

const fleetSlice = createSlice({
	name: 'fleet',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchFleet.fulfilled, (state, { payload, meta }) => ({
			...state,
			fleet: payload,
			loading: false,
			world: meta.arg?.world,
		}));
		builder.addCase(fetchFleet.pending, (state, { meta }) => {
			if (state.world === meta.arg?.world) {
				return {
					...state,
					loading: false,
				};
			}
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(fetchFleet.rejected, (state, action) => {
			if (action.payload) {
				// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
				state.error = action.payload.errorMessage;
			} else {
				state.error = action.error.message;
			}
		});
	},
});

export default fleetSlice.reducer;
