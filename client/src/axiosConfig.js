import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api',
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (
			error.response.status === 403 &&
			originalRequest.url === '/user/refreshTokens'
		) {
			localStorage.removeItem('username');
			localStorage.removeItem('bio');
			localStorage.removeItem('profilePic');

			document.location.href = '/log-in';

			return await api.get('/user/log-out');
		}

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await api.post('/user/refreshTokens', {
					username: localStorage.getItem('username'),
				});
				console.log(response);

				return await api.get(originalRequest.url);
			} catch (err) {
				return await api.get('/user/log-out');
			}
		}
		Promise.reject(error);
	}
);

export default api;
