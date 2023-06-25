import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	world: 'stratus',
};

export const worldSlice = createSlice({
	name: 'world',
	initialState,
	reducers: {
		updateWorld: (state, { payload }) => ({
			...state,
			world: payload,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { updateWorld } = worldSlice.actions;

export default worldSlice.reducer;
