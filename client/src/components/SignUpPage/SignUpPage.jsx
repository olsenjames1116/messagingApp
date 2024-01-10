import { useEffect } from 'react';
import SignUpForm from '../SignUpForm/SignUpForm';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	return (
		<main>
			<div className="content">
				<div className="title">App Title</div>
				<div className="input">
					<div className="banner">Create an Account</div>
					<SignUpForm />
				</div>
			</div>
		</main>
	);
}

export default SignUpPage;
