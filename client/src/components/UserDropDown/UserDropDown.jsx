import { useEffect } from 'react';
import PropTypes from 'prop-types';
import LogOut from '../LogOut/LogOut';
import { Link } from 'react-router-dom';
import styles from './UserDropDown.module.css';

// Represents the dropdown menu that displays under the user info in the header.
function UserDropDown({ displayDropDown, setDisplayDropDown, dropDownRef }) {
	useEffect(() => {
		// Adds an event listener to hide the dropdown.
		document.addEventListener('mousedown', (event) => {
			// If the menu is displayed and the event occurred outside of the menu, hide menu.
			if (displayDropDown && !dropDownRef.current?.contains(event.target)) {
				setDisplayDropDown(false);
			}
		});
	});

	return (
		<div className={styles.dropDown} ref={dropDownRef}>
			<Link to="/edit-user">Edit Profile</Link>
			<LogOut />
		</div>
	);
}

UserDropDown.propTypes = {
	displayDropDown: PropTypes.bool,
	setDisplayDropDown: PropTypes.func,
	dropDownRef: PropTypes.object,
};

export default UserDropDown;
