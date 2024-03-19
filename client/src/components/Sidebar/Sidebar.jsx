import PropTypes from 'prop-types';
import FriendList from '../FriendList/FriendList';

// Represents the sidebar on the side of the page.
function Sidebar({ setDisplayMenu }) {
	/* Reached when the add friend button has been clicked. Will display the friend
	search menu. */
	const handleClick = (event) => {
		event.preventDefault();
		console.log('clicked');

		setDisplayMenu(true);
	};

	return (
		<section>
			<ul>
				<li key={1}>
					<button onClick={handleClick}>Add Friend</button>
				</li>
				<FriendList />
			</ul>
		</section>
	);
}

Sidebar.propTypes = {
	setDisplayMenu: PropTypes.func,
};

export default Sidebar;
