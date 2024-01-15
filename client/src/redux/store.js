import { configureStore } from '@reduxjs/toolkit';
import userReducer from './state/userSlice';
import friendReducer from './state/friendSlice';
import messagesBetweenUsersReducer from './state/messagesBetweenUsers';

export default configureStore({
	reducer: {
		user: userReducer,
		friend: friendReducer,
		messagesBetweenUsers: messagesBetweenUsersReducer,
	},
});
