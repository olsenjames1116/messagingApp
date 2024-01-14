import PropTypes from 'prop-types';
import FriendList from '../FriendList/FriendList';

// Represents the sidebar on the side of the page.
function Sidebar({ setDisplayMenu }) {
	const handleClick = (event) => {
		event.preventDefault();

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
