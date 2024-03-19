import { useEffect } from 'react';
import Router from './Router';
import { useDispatch } from 'react-redux';
import { addUser } from './redux/state/userSlice';
import Footer from './components/Footer/Footer';
import './App.css';

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
			<Footer />
		</>
	);
}

export default App;
