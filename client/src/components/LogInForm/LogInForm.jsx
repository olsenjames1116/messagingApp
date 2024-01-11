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

	const logIn = async () => {
		try {
			const response = await api.post('/user/log-in', {
				username: username,
				password: password,
			});
			console.log(response);
		} catch (err) {
			if (err.response.status === 400 || err.response.status === 401) {
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				err.response.status === 400
					? setInputMessages([...message])
					: setInputMessages([message]);
			} else {
				console.log(err);
			}
		}
	};

	const clearInput = () => {
		usernameRef.current.value = '';
		passwordRef.current.value = '';
	};

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
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button>Log In</button>
		</form>
	);
}

export default LogInForm;
