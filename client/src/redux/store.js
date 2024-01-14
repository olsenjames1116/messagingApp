import { configureStore } from '@reduxjs/toolkit';
import userReducer from './state/userSlice';
import friendReducer from './state/friendSlice';

export default configureStore({
	reducer: { user: userReducer, friend: friendReducer },
});
