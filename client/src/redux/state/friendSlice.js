import { createSlice } from '@reduxjs/toolkit';

// Represents the selected friend to message with.
export const friendSlice = createSlice({
	name: 'friend',
	initialState: {
		value: {},
	},
	reducers: {
		addFriend: (state, action) => {
			return { ...action.payload };
		},
		removeFriend: () => {
			return {};
		},
	},
});

export const { addFriend, removeFriend } = friendSlice.actions;
export default friendSlice.reducer;
