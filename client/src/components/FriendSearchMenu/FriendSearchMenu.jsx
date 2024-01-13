import PropTypes from 'prop-types';
import { useEffect } from 'react';

function FriendSearchMenu({ displayMenu, setDisplayMenu, menuRef }) {
	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (displayMenu && !menuRef?.current?.contains(event.target)) {
				setDisplayMenu(false);
			}
		});
	});

	return <section ref={menuRef}>Friend Search Menu</section>;
}

FriendSearchMenu.propTypes = {
	displayMenu: PropTypes.bool,
	setDisplayMenu: PropTypes.func,
	menuRef: PropTypes.object,
};

export default FriendSearchMenu;
