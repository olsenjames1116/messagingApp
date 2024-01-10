import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import api from '../../axiosConfig';
import './SignUpForm.module.css';
import { useNavigate } from 'react-router-dom';

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

	const handleInputError = () => {
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

	const signUp = async () => {
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});
			const inputRefs = [usernameRef, passwordRef, confirmPasswordRef];
			inputRefs.map(
				(inputRef) => (inputRef.current.style.backgroundColor = 'white')
			);
			inputMessagesRef.current.style.color = 'black';
			setInputMessages([response.data.message]);
			setTimeout(() => {
				navigate('/log-in');
			}, 3000);
		} catch (err) {
			if (err.response.status === 400) {
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([...message]);
			} else {
				console.log(err);
			}
		}
	};

	const clearInput = () => {
		usernameRef.current.value = '';
		passwordRef.current.value = '';
		confirmPasswordRef.current.value = '';
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);

		if (event.target.checkValidity()) {
			signUp();
			clearInput();
		} else {
			inputMessagesRef.current.style.color = 'red';
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
