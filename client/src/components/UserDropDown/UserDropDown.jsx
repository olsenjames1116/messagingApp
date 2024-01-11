import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function UserDropDown({ displayDropDown, setDisplayDropDown }) {
	const dropDownRef = useRef(null);

	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (displayDropDown && !dropDownRef.current?.contains(event.target)) {
				setDisplayDropDown(false);
			}
		});
	});

	return <div ref={dropDownRef}>UserDropDown</div>;
}

UserDropDown.propTypes = {
	displayDropDown: PropTypes.bool,
	setDisplayDropDown: PropTypes.func,
};

export default UserDropDown;
