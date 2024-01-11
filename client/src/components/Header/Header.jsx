import { useState, useRef } from 'react';
import Logo from '../Logo/Logo';
import User from '../User/User';
import UserDropDown from '../UserDropDown/UserDropDown';

function Header() {
	const [displayDropDown, setDisplayDropDown] = useState(false);

	const dropDownRef = useRef(null);

	return (
		<header>
			<Logo />
			<User setDisplayDropDown={setDisplayDropDown} />
			{displayDropDown && (
				<UserDropDown
					displayDropDown={displayDropDown}
					setDisplayDropDown={setDisplayDropDown}
					dropDownRef={dropDownRef}
				/>
			)}
		</header>
	);
}

export default Header;
