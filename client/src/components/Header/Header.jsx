import { useState } from 'react';
import Logo from '../Logo/Logo';
import User from '../User/User';
import UserDropDown from '../UserDropDown/UserDropDown';

function Header() {
	const [displayDropDown, setDisplayDropDown] = useState(false);

	return (
		<header>
			<Logo />
			<User setDisplayDropDown={setDisplayDropDown} />
			{displayDropDown && (
				<UserDropDown
					displayDropDown={displayDropDown}
					setDisplayDropDown={setDisplayDropDown}
				/>
			)}
		</header>
	);
}

export default Header;
