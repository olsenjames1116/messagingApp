import { useEffect, useState, useRef } from 'react';
import { userImage } from '../../assets/images';

function LogInPage() {
	const [inputMessages, setInputMessages] = useState([]);

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	useEffect(() => {
		document.title = 'Log In';
	}, []);

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
			console.log('success');
		} else {
			handleInputError();
		}
	};

	return (
		<main>
			<div className="content">
				<div className="title">App Title</div>
				<div className="input">
					<div className="banner">
						<img src={userImage} />
						<span>Welcome!</span>
					</div>
					<form method="POST" action="" onSubmit={handleSubmit} noValidate>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="username"
							required
							ref={usernameRef}
						/>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="password"
							required
							ref={passwordRef}
						/>
						<ul className="inputMessages">
							{inputMessages.map((message, index) => {
								return <li key={index}>{message}</li>;
							})}
						</ul>
						<button>Log In</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default LogInPage;
