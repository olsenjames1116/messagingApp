import { Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import EditUserPage from './components/EditUserPage/EditUserPage';

// Routes users to appropriate pages using react router.
function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/edit-user" element={<EditUserPage />} />
		</Routes>
	);
}

export default Router;
