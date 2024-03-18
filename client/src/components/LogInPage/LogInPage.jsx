import { useEffect } from 'react';
import { userImage } from '../../assets/images';
import LogInForm from '../LogInForm/LogInForm';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/state/userSlice';
import { removeUser } from '../../redux/state/userSlice';
import { removeFriend } from '../../redux/state/friendSlice';
import { removeMessagesBetweenUsers } from '../../redux/state/messagesBetweenUsers';
import './LogInPage.css';

// Represents the log in page.
function LogInPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Log In';

		// Remove user information from state.
		dispatch(removeUser());

		// Remove friend info from state.
		dispatch(removeFriend());

		// Remove messages from state.
		dispatch(removeMessagesBetweenUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Reached from a successful demo account log in.
	const handleSuccess = (response) => {
		// Store information returned from backend.
		const user = response.data;
		localStorage.setItem('user', JSON.stringify(user));

		// Store the user information in state.
		dispatch(addUser(user));

		// Navigate user to their home page.
		navigate('/');
	};

	// Send demo account info to backend for validation.
	const handleClick = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/log-in', {
				username: 'demo',
				password: '123',
			});
			// Anything below here is reached if input is valid.
			handleSuccess(response);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<main>
			<div className="content centerContent">
				<div className="title">Hermes</div>
				<div className="input">
					<div className="banner">
						<img src={userImage} />
						<span>Welcome!</span>
					</div>
					<LogInForm />
				</div>
				<div className="options">
					New Here?
					<Link to="/sign-up">Sign Up</Link>
					or Use the Demo Account
					<button onClick={handleClick}>Demo Account</button>
				</div>
			</div>
		</main>
	);
}

export default LogInPage;
