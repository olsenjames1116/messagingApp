import { useEffect } from 'react';
import { userImage } from '../../assets/images';
import LogInForm from '../LogInForm/LogInForm';

function LogInPage() {
	useEffect(() => {
		document.title = 'Log In';
	}, []);

	return (
		<main>
			<div className="content">
				<div className="title">App Title</div>
				<div className="input">
					<div className="banner">
						<img src={userImage} />
						<span>Welcome!</span>
					</div>
					<LogInForm />
				</div>
			</div>
		</main>
	);
}

export default LogInPage;
