import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api',
});

export default api;