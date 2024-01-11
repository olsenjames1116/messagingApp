function LogOut() {
	const logOut = () => {
		console.log('Logged out.');
	};

	return <div onClick={logOut}>Log Out</div>;
}

export default LogOut;
