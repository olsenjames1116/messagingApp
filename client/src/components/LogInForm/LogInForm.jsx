import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';
// import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

function LogInForm() {
	const [inputMessages, setInputMessages] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const inputMessagesRef = useRef(null);

	// const navigate = useNavigate();

	// Send input to backend for validation.
	const logIn = async () => {
		try {
			const response = await api.post('/user/log-in', {
				username: username,
				password: password,
			});
			// Anything below here is reached if input is valid.
			console.log(response);
		} catch (err) {
			// Anything here is due to an error.
			if (err.response.status === 400 || err.response.status === 401) {
				// 400 and 401 error codes are sent from the backend if data from the form is invalid.
				const { message } = err.response.data;
				// Style message from backend to appear as invalid.
				inputMessagesRef.current.style.color = 'red';
				// Display message from backend.
				err.response.status === 400
					? setInputMessages([...message])
					: setInputMessages([message]);
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
	};

	// Reached when the form has been submitted.
	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);

		if (event.target.checkValidity()) {
			logIn();
			clearInput();
		} else {
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
			default:
				console.log('None of the ids matched.');
		}
	};

	return (
		<form method="POST" action="" onSubmit={handleSubmit} noValidate>
			<input
				type="text"
				id="username"
				name="username"
				placeholder="username"
				required
				ref={usernameRef}
				onChange={handleChange}
			/>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
				required
				ref={passwordRef}
				onChange={handleChange}
			/>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button>Log In</button>
		</form>
	);
}

export default LogInForm;
