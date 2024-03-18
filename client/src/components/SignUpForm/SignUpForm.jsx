import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

// Represents the sign up form on the sign up page.
function SignUpForm() {
	const [inputMessages, setInputMessages] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);
	const inputMessagesRef = useRef(null);

	const navigate = useNavigate();

	// Reached if backend validation was successful.
	const handleSuccess = (response) => {
		// Style message from backend to appear as valid.
		inputMessagesRef.current.style.color = 'black';

		// Display message from backend.
		setInputMessages([response.data.message]);

		// Redirect the user to log in with their new account.
		setTimeout(() => {
			navigate('/log-in');
		}, 3000);
	};

	// Send input to the backend for validation.
	const signUp = async () => {
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});

			// This is reached if all input is valid.
			handleSuccess(response);
		} catch (err) {
			// Anything here is due to an error.
			if (err.response?.status === 400) {
				// A 400 error code is sent from the backend if data from the request was invalid.
				const { message } = err.response.data;
				// Style message from backend to appear as invalid.
				inputMessagesRef.current.style.color = 'red';
				// Display message from backend.
				setInputMessages([...message]);
			} else {
				// This is a catch all for everything that is not invalid data.
				console.log(err);
			}
		}
	};

	// Clear all input in the form.
	const clearInput = () => {
		usernameRef.current.value = '';
		passwordRef.current.value = '';
		confirmPasswordRef.current.value = '';
	};

	// Reached when there is an error detected from front end validation.
	const handleInputError = () => {
		// Each check will determine what caused the error and display the appropriate error message for clarity.
		if (!usernameRef.current.checkValidity()) {
			usernameRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Username must not be empty.']);
		}

		if (!passwordRef.current.checkValidity()) {
			passwordRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Password must not be empty.']);
		}

		if (!confirmPasswordRef.current.checkValidity()) {
			confirmPasswordRef.current.validity.valueMissing &&
				setInputMessages((state) => [
					...state,
					'Confirmation password must not be empty.',
				]);
		}
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);

		if (event.target.checkValidity()) {
			// If input is valid, the below will executed.
			signUp();
			clearInput();
		} else {
			// If input is invalid, the below will be executed.
			inputMessagesRef.current.style.color = 'red';
			handleInputError();
		}
	};

	// Reached when a change has been made to an input field.
	const handleChange = ({ target }) => {
		const { id, value } = target;

		// Determines which field was changed to store in state.
		switch (id) {
			case 'username':
				setUsername(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			default:
				console.log('None of the ids matched.');
		}
	};

	return (
		<form
			className="accountForm"
			method="POST"
			action=""
			onSubmit={handleSubmit}
			noValidate
		>
			<input
				className="username"
				type="text"
				id="username"
				name="username"
				placeholder="username"
				ref={usernameRef}
				required
				onChange={handleChange}
			/>
			<input
				className="password"
				type="password"
				id="password"
				name="password"
				placeholder="password"
				ref={passwordRef}
				required
				onChange={handleChange}
			/>
			<input
				className="password"
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="confirm password"
				ref={confirmPasswordRef}
				required
				onChange={handleChange}
			/>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
