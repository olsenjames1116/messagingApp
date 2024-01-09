import { userImage } from '../../assets/images';

function LogInPage() {
	const handleSubmit = (event) => {
		event.preventDefault();
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
					<form method="POST" action="" onSubmit={handleSubmit}>
						<input type="text" id="username" name="username" />
						<input type="password" id="password" name="password" />
						<button>Log In</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default LogInPage;
