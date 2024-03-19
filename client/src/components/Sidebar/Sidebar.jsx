import PropTypes from 'prop-types';
import FriendList from '../FriendList/FriendList';
import styles from './Sidebar.module.css';

// Represents the sidebar on the side of the page.
function Sidebar({ setDisplayMenu }) {
	/* Reached when the add friend button has been clicked. Will display the friend
	search menu. */
	const handleClick = (event) => {
		event.preventDefault();

		setDisplayMenu(true);
	};

	return (
		<section className={styles.sidebar}>
			<ul>
				<li className={styles.buttonContainer} key={1}>
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
