import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FriendSearchForm from '../FriendSearchForm/FriendSearchForm';
import FriendSearchResult from '../FriendSearchResult/FriendSearchResult';
import styles from './FriendSearchMenu.module.css';

// Represents the menu to search for users.
function FriendSearchMenu({ displayMenu, setDisplayMenu, menuRef }) {
	const [friendSearchResult, setFriendSearchResult] = useState([]);

	useEffect(() => {
		// Adds an event listener to hide the friend search menu.
		document.addEventListener('mousedown', (event) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (displayMenu && !menuRef?.current?.contains(event.target)) {
				setDisplayMenu(false);
			}
		});
	});

	return (
		<section className={styles.menu} ref={menuRef}>
			<FriendSearchForm setFriendSearchResult={setFriendSearchResult} />
			<FriendSearchResult friendSearchResult={friendSearchResult} />
		</section>
	);
}

FriendSearchMenu.propTypes = {
	displayMenu: PropTypes.bool,
	setDisplayMenu: PropTypes.func,
	menuRef: PropTypes.object,
};

export default FriendSearchMenu;
