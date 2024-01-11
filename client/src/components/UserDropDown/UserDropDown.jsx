import { useEffect } from 'react';
import PropTypes from 'prop-types';
import LogOut from '../Logout/LogOut';

function UserDropDown({ displayDropDown, setDisplayDropDown, dropDownRef }) {
	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (displayDropDown && !dropDownRef.current?.contains(event.target)) {
				setDisplayDropDown(false);
			}
		});
	});

	return (
		<div ref={dropDownRef}>
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
