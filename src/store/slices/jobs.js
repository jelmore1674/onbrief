import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobData } from '../../lib/onair';

export const fetchJobs = createAsyncThunk(
	'jobs/fetch',
	async (tokens, { getState, rejectWithValue }) => {
		const state = getState();

		try {
			const { jobs, vaJobs } = await getJobData(tokens);
			return { jobs, vaJobs, world: state.world.world };
		} catch (e) {
			// TODO: add to log file
			return rejectWithValue('check api key');
		}
	}
);

const initialState = {
	jobs: [],
	vaJobs: [],
	loading: false,
	error: null,
	tokens: null,
	world: '',
};

const jobSlice = createSlice({
	name: 'jobs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchJobs.fulfilled, (state, { meta, payload }) => ({
			...state,
			jobs: payload.jobs,
			vaJobs: payload.vaJobs,
			loading: false,
			world: meta.arg?.world,
		}));
		builder.addCase(fetchJobs.pending, (state, { meta }) => {
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
