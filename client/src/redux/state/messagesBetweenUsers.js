import { createSlice } from '@reduxjs/toolkit';

// Represents the messages between friends when a friend is selected.
export const messagesBetweenUsersSlice = createSlice({
	name: 'messagesBetweenUsers',
	initialState: {
		value: {},
	},
	reducers: {
		addMessagesBetweenUsers: (state, action) => {
			return { ...state.value, ...action.payload };
		},
		removeMessagesBetweenUsers: () => {
			return {};
		},
	},
});

export const { addMessagesBetweenUsers, removeMessagesBetweenUsers } =
	messagesBetweenUsersSlice.actions;
export default messagesBetweenUsersSlice.reducer;
