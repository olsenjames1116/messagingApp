import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';

function LogInForm() {
	const [inputMessages, setInputMessages] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const handleInputError = () => {
		if (!usernameRef.current.checkValidity()) {
			usernameRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Username must not be empty.']);
		}

		if (!passwordRef.current.checkValidity()) {
			passwordRef.current.validity.valueMissing &&
				setInputMessages((state) => [...state, 'Password must not be empty.']);
		}
	};

	const logIn = async () => {
		console.log(username, password);
	};

	const clearInput = () => {
		usernameRef.current.value = '';
		passwordRef.current.value = '';
	};

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

	const handleChange = ({ target }) => {
		const { id, value } = target;

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
			<InputMessages messages={inputMessages} />
			<button>Log In</button>
		</form>
	);
}

export default LogInForm;
