import { createSlice } from '@reduxjs/toolkit';

// Represents the user information that is stored in state.
export const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: {},
	},
	reducers: {
		addUser: (state, action) => {
			return { ...state, ...action.payload };
		},
		updatePhoto: (state, action) => {
			return { ...state, profilePic: action.payload };
		},
		updateBio: (state, action) => {
			return { ...state, bio: action.payload };
		},
		updateFriends: (state, action) => {
			return { ...state, friends: [...state.friends, action.payload] };
		},
		removeUser: () => {
			return {};
		},
	},
});

export const { addUser, updatePhoto, updateBio, updateFriends, removeUser } =
	userSlice.actions;
export default userSlice.reducer;
