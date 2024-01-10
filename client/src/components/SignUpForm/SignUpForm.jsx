import { useState, useRef } from 'react';

function SignUpForm() {
	const [inputMessages, setInputMessages] = useState([]);

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

	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);

		if (event.target.checkValidity()) {
			console.log('success');
		} else {
			handleInputError();
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
			/>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="password"
				ref={passwordRef}
				required
			/>
			<input
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="confirm password"
				ref={confirmPassswordRef}
				required
			/>
			<ul className="inputMessages">
				{inputMessages.map((message, index) => {
					return <li key={index}>{message}</li>;
				})}
			</ul>
			<button>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
