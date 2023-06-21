import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobData } from '../../lib/onair';

export const fetchFleet = createAsyncThunk(
	'fleet/fetch',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getJobData();
			return response;
		} catch (e) {
			console.log({ e });
			return rejectWithValue('check api key');
		}
	}
);

const initialState = {
	fleet: [],
	loading: false,
	error: null,
};

const fleetlice = createSlice({
	name: 'fleet',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchFleet.fulfilled, (state, { payload }) => ({
			...state,
			fleet: payload,
			loading: false,
		}));
		builder.addCase(fetchFleet.pending, (state, action) => ({
			...state,
			loading: true,
		}));
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

export default fleetlice.reducer;
