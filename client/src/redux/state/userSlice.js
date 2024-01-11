import { createSlice } from '@reduxjs/toolkit';

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
		removeUser: () => {
			return {};
		},
	},
});

export const { addUser, updatePhoto, updateBio, removeUser } =
	userSlice.actions;
export default userSlice.reducer;
