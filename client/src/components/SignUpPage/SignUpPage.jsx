import { useEffect } from 'react';
import SignUpForm from '../SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';

// Represents the sign up page for the user to create an account.
function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	return (
		<main>
			<div className="content centerContent">
				<div className="title">App Title</div>
				<div className="input">
					<div className="banner">Create an Account</div>
					<SignUpForm />
				</div>
				<div className="options">
					Already have an account?
					<Link to="/log-in">Log In</Link>
				</div>
			</div>
		</main>
	);
}

export default SignUpPage;
