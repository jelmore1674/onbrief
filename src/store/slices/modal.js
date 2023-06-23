import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	showModal: false,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: () => ({
			showModal: true,
		}),
		closeModal: () => ({
			showModal: false,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
