import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	apiKey: '',
	companyId: '',
	vaId: '',
	cumulus: {
		apiKey: '',
		companyId: '',
		vaId: '',
		world: 'cumulus',
	},
	stratus: {
		apiKey: '',
		companyId: '',
		vaId: '',
		world: 'stratus',
	},
	thunder: {
		apiKey: '',
		companyId: '',
		vaId: '',
		world: 'thunder',
	},
	savedTokens: {},
};

export const tokenSlice = createSlice({
	name: 'tokens',
	initialState,
	reducers: {
		updateToken: (state, { payload }) => ({
			...state,
			...payload,
		}),
		updateWorldTokens: (state, { payload }) => ({
			...state,
			[payload]: {
				apiKey: state.apiKey,
				companyId: state.companyId,
				vaId: state.vaId,
				world: payload,
			},
		}),
	},
});

// Action creators are generated for each case reducer function
export const { updateToken, updateWorldTokens } = tokenSlice.actions;

export default tokenSlice.reducer;
