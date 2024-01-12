import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/state/userSlice';

// Represents the home page for the user.
function HomePage() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Home Page';

		// Log the user out.
		const logOut = () => {
			// Remove the user's info from localStorage.
			localStorage.removeItem('username');
			localStorage.removeItem('profilePic');
			localStorage.removeItem('bio');

			// Remove the user's info from state.
			dispatch(removeUser());

			// Navigate the user back to log in.
			navigate('/log-in');
		};

		// Verify a user's token to access this page.
		const fetchData = async () => {
			try {
				await api.get('/user/get-info');
			} catch (err) {
				if (err.response.status === 403) {
					// This error means the user's token was invalid.
					logOut();
				} else {
					// A catch all to display errors to the console.
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
