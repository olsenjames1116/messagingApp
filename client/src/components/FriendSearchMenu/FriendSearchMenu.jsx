import PropTypes from 'prop-types';
import { useEffect } from 'react';
import FriendSearchForm from '../FriendSearchForm/FriendSearchForm';

// Represents the menu to search for users.
function FriendSearchMenu({ displayMenu, setDisplayMenu, menuRef }) {
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
		<section ref={menuRef}>
			<FriendSearchForm />
		</section>
	);
}

FriendSearchMenu.propTypes = {
	displayMenu: PropTypes.bool,
	setDisplayMenu: PropTypes.func,
	menuRef: PropTypes.object,
};

export default FriendSearchMenu;
