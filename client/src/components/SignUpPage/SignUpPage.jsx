import { useEffect } from 'react';

function SignUpPage() {
	useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<main>
			<div className="content">
				<div className="title">App Title</div>
				<div className="input">
					<div className="banner">Create an Account</div>
					<form method="POST" action="" onSubmit={handleSubmit}>
						<input type="text" id="username" name="username" />
						<input type="password" id="password" name="password" />
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
						/>
						<button>Sign Up</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default SignUpPage;
