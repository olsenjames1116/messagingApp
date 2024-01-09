import { Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import HomePage from './components/HomePage/HomePage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/log-in" element={<LogInPage />} />
		</Routes>
	);
}

export default Router;
