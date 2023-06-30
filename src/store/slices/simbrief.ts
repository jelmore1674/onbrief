import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { writeLog } from '../../utils';
import { RootState } from '../store';

export interface OFP {
	text: {
		plan_html: string;
	};
}

export const fetchOFP = createAsyncThunk(
	'fetch/ofp',
	async (_, { getState, rejectWithValue }) => {
		const { simbrief } = getState() as RootState;

		try {
			const response = await axios.get(
				`https://www.simbrief.com/api/xml.fetcher.php?username=${simbrief.username}&json=1`
			);
			return response.data as OFP;
		} catch (e) {
			writeLog(JSON.stringify({ fetchOFP: e }));
			return rejectWithValue('Unable to fetch OFP');
		}
	}
);

const initialState = {
	simbrief: {},
	username: '',
	ofp: '',
	error: '',
	loading: false,
};

export const simbriefSlice = createSlice({
	name: 'simbrief',
	initialState,
	reducers: {
		updateSimbrief: (state, { payload }) => {
			return {
				...state,
				simbrief: payload,
			};
		},
		updateUsername: (state, { payload }) => ({
			...state,
			username: payload,
		}),
		clearOFP: (state) => ({
			...state,
			ofp: '',
		}),
	},
	extraReducers: (builder) => {
		// The `builder` callback form is used here because it provides correctly typed reducers from the action creators
		builder.addCase(fetchOFP.fulfilled, (state, { payload }) => ({
			...state,
			ofp: payload.text.plan_html,
			loading: false,
		}));
		builder.addCase(fetchOFP.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(fetchOFP.rejected, (state, action) => {
			if (action.payload) {
				state.loading = false;
				// Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
				state.error = action.payload as string;
			} else {
				state.loading = false;
				state.error = action.error.message as string;
			}
		});
	},
});

// Action creators are generated for each case reducer function
export const { updateSimbrief, updateUsername, clearOFP } =
	simbriefSlice.actions;

export default simbriefSlice.reducer;
