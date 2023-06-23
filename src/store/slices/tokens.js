import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	apiKey: '',
	companyId: '',
	vaId: '',
	savedTokens: {},
};

export const tokenSlice = createSlice({
	name: 'tokens',
	initialState,
	reducers: {
		updateToken: (state, action) => ({
			...state,
			...action.payload,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { updateToken } = tokenSlice.actions;

export default tokenSlice.reducer;
