import Header from '../Header/Header';
import EditUserForm from '../EditUserForm/EditUserForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/state/userSlice';
import { removeFriend } from '../../redux/state/friendSlice';
import { removeMessagesBetweenUsers } from '../../redux/state/messagesBetweenUsers';
import styles from './EditUserPage.module.css';

// Represents the page on which the user can edit their profile.
function EditUserPage() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Edit Profile';

		// Log the user out.
		const logOut = () => {
			// Remove the user's info from localStorage.
			localStorage.removeItem('user');

			// Remove the user's info from state.
			dispatch(removeUser());

			// Remove friend info from state.
			dispatch(removeFriend());

			// Remove messages from state.
			dispatch(removeMessagesBetweenUsers());

			// Navigate the user back to log in.
			navigate('/log-in');
		};

		// Validate a user's token when the page renders.
		const fetchData = async () => {
			try {
				await api.get('/user/verifyToken');
			} catch (err) {
				if (err.response?.status === 403) {
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
		<div className={styles.edit}>
			<Header />
			<main className={styles.editMain}>
				<div className={styles.editContent}>
					<EditUserForm />
				</div>
			</main>
		</div>
	);
}

export default EditUserPage;
