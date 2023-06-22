import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	message: null,
};

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		updateToastMessage: (state, action) => ({
			...state,
			...action.payload,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { updateToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
