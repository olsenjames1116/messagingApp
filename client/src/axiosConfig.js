import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUser } from './redux/state/userSlice';
import { removeFriend } from './redux/state/friendSlice';

// Create an axios object to be used for api calls with presets.
const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api',
});

// Every response from api passes through here first.
api.interceptors.response.use(
	(response) => {
		return response;
	},
	// Reached from all errors returned from call to api.
	async function (error) {
		const originalRequest = error.config;

		const dispatch = useDispatch();

		/* Check if a 403 error was returned from invalid tokens and if that error was 
		returned from refreshing tokens. */
		if (
			error.response?.status === 403 &&
			originalRequest.url === '/user/refreshTokens'
		) {
			// The refresh token was invalid.
			// Remove user information from local storage.
			localStorage.removeItem('user');

			// Remove user information from state.
			dispatch(removeUser());

			// Remove friend info from state.
			dispatch(removeFriend());

			// Log the user out and redirect to log in.
			await api.get('/user/log-out');

			return (document.location.href = '/log-in');
		}

		// Check if a 403 error was returned and if a the request has been retried.
		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				// Refresh tokens.
				await api.post('/user/refreshTokens', {
					username: JSON.parse(localStorage.getItem('user')).username,
				});

				return await api.get(originalRequest.url);
			} catch (err) {
				// There was an error refreshing tokens.
				localStorage.removeItem('user');

				// Remove user information from state.
				dispatch(removeUser());

				// Remove friend info from state.
				dispatch(removeFriend());

				// Log the user out and redirect to log in.
				await api.get('/user/log-out');

				return (document.location.href = '/log-in');
			}
		}
		/* Errors were not a result from invalid tokens. Reject the error 
		and return error back to where it was called from. */
		return Promise.reject(error);
	}
);

export default api;
