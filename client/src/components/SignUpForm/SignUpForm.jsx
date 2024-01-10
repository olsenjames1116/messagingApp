import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';

function SignUpForm() {
	const [inputMessages, setInputMessages] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPassswordRef = useRef(null);

	const handleInputError = () => {
		if (!usernameRef.current.checkValidity()) {
			usernameRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Username must not be empty.']);
		}

		if (!passwordRef.current.checkValidity()) {
			passwordRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Password must not be empty.']);
		}

		if (!confirmPassswordRef.current.checkValidity()) {
			confirmPassswordRef.current.validity.valueMissing &&
				setInputMessages((state) => [
					...state,
					'Confirmation password must not be empty.',
				]);
		}
	};

	const signUp = async () => {
		console.log(username, password, confirmPassword);
	};

	const clearInput = () => {
		usernameRef.current.value = '';
		passwordRef.current.value = '';
		confirmPassswordRef.current.value = '';
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);

		if (event.target.checkValidity()) {
			signUp();
			clearInput();
		} else {
			handleInputError();
		}
	};

	const handleChange = ({ target }) => {
		const { id, value } = target;

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
		<form method="POST" action="" onSubmit={handleSubmit} noValidate>
			<input
				type="text"
				id="username"
				name="username"
				placeholder="username"
				ref={usernameRef}
				required
				onChange={handleChange}
			/>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
				ref={passwordRef}
				required
				onChange={handleChange}
			/>
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="confirm password"
				ref={confirmPassswordRef}
				required
				onChange={handleChange}
			/>
			<InputMessages messages={inputMessages} />
			<button>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
