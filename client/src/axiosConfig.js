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

			await api.get('/user/log-out');

			return (document.location.href = '/log-in');
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
				await api.get('/user/log-out');
				return (document.location.href = '/log-in');
			}
		}
		Promise.reject(error);
	}
);

export default api;
