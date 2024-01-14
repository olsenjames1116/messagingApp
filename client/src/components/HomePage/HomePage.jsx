import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/state/userSlice';
import Sidebar from '../Sidebar/Sidebar';
import FriendSearchMenu from '../FriendSearchMenu/FriendSearchMenu';
import ChatBox from '../ChatBox/ChatBox';

// Represents the home page for the user.
function HomePage() {
	const [displayMenu, setDisplayMenu] = useState(false);

	const menuRef = useRef(null);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Home Page';

		// Log the user out.
		const logOut = () => {
			// Remove the user's info from localStorage.
			localStorage.removeItem('user');

			// Remove the user's info from state.
			dispatch(removeUser());

			// Navigate the user back to log in.
			navigate('/log-in');
		};

		// Verify a user's token to access this page.
		const fetchData = async () => {
			try {
				await api.get('/user/get-info');
			} catch (err) {
				if (err.response.status === 403) {
					// This error means the user's token was invalid.
					logOut();
				} else {
					// A catch all to display errors to the console.
					console.log(err);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Header />
			<main>
				<Sidebar setDisplayMenu={setDisplayMenu} />
				<div className="content">
					<ChatBox />
				</div>
				{displayMenu && (
					<FriendSearchMenu
						displayMenu={displayMenu}
						setDisplayMenu={setDisplayMenu}
						menuRef={menuRef}
					/>
				)}
			</main>
		</>
	);
}

export default HomePage;
