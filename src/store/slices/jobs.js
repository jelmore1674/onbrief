import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobData } from '../../lib/onair';

export const fetchJobs = createAsyncThunk(
	'jobs/fetch',
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
	jobs: [],
	loading: false,
	error: null,
};

const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchJobs.fulfilled, (state, { payload }) => ({
			...state,
			jobs: payload,
			loading: false,
		}));
		builder.addCase(fetchJobs.pending, (state, action) => ({
			...state,
			loading: true,
		}));
		builder.addCase(fetchJobs.rejected, (state, action) => {
			if (action.payload) {
				// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
				state.error = action.payload.errorMessage;
			} else {
				state.error = action.error.message;
			}
		});
	},
});

export default jobSlice.reducer;
