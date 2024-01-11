import { useDispatch } from 'react-redux';
import api from '../../axiosConfig';
import { removeUser } from '../../redux/state/userSlice';
import { useNavigate } from 'react-router-dom';

// Represents the log out component displayed in the user dropdown.
function LogOut() {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	// Reached after a successful call to the backend.
	const handleSuccess = () => {
		// Remove the user's info from localStorage.
		localStorage.removeItem('username');
		localStorage.removeItem('profilePic');
		localStorage.removeItem('bio');

		// Remove the user's info from state.
		dispatch(removeUser());

		// Navigate the user back to log in.
		navigate('/log-in');
	};

	const logOut = async () => {
		try {
			await api.get('/user/log-out');
			// Anything below here is reached on successful call to backend.
			handleSuccess();
		} catch (err) {
			// A catch all to display errors to the console.
			console.log(err);
		}
	};

	return <div onClick={logOut}>Log Out</div>;
}

export default LogOut;
