import { useEffect } from 'react';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/state/userSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// If the page is reloaded, store the user in state from localStorage.
		const user = JSON.parse(localStorage.getItem('user'));

		user && dispatch(addUser(user));
	}, []);

	return (
		<>
			<Router />
		</>
	);
}

export default App;
