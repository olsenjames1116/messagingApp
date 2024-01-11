import { useEffect } from 'react';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/state/userSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const username = localStorage.getItem('username');
		const bio = localStorage.getItem('bio');
		const profilePic = localStorage.getItem('profilePic');

		const user = { username: username, bio: bio, profilePic: profilePic };

		username && dispatch(addUser(user));
	}, []);

	return (
		<>
			<Router />
		</>
	);
}

export default App;
