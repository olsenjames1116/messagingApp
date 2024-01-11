import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Header from '../Header/Header';

// Represents the home page for the user.
function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Home Page';

		// Verify a user's token to access this page.
		const fetchData = async () => {
			try {
				await api.get('/user/verifyToken');
			} catch (err) {
				if (err.response.status === 403) {
					// The user's token is invalid. Redirect them back to log in.
					navigate('/log-in');
				} else {
					// A catch all for errors that are not due to a forbidden token.
					console.log(err);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Header />
			<main>
				<div className="content">Home Page</div>
			</main>
		</>
	);
}

export default HomePage;
