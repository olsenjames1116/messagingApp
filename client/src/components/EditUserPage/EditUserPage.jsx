import Header from '../Header/Header';
import EditUserForm from '../EditUserForm/EditUserForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/state/userSlice';

// Represents the page on which the user can edit their profile.
function EditUserPage() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Edit Profile';

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

		// Validate a user's token when the page renders.
		const fetchData = async () => {
			try {
				await api.get('/user/verifyToken');
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
				<div className="content">
					<EditUserForm />
				</div>
			</main>
		</>
	);
}

export default EditUserPage;