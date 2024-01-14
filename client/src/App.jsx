import { useEffect } from 'react';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/state/userSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
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
