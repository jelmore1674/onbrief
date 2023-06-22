import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	aircraftIcao: {},
	selectedAircraft: {},
};

export const aircraftDataSlice = createSlice({
	name: 'aircraftData',
	initialState,
	reducers: {
		selectAircraft: (state, action) => ({
			...state,
			selectedAircraft: action.payload,
		}),
		updateAircraftIcao: (state, action) => ({
			...state,
			aircraftIcao: {
				...state.aircraftIcao,
				...action.payload,
			},
		}),
	},
});

// Action creators are generated for each case reducer function
export const { selectAircraft, updateAircraftIcao } = aircraftDataSlice.actions;

export default aircraftDataSlice.reducer;
