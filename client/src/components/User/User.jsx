import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './User.module.css';

// Represents the user info displayed in the header.
function User({ setDisplayDropDown }) {
	const user = useSelector((state) => state.user);

	// Reached when the component is clicked.
	const handleClick = () => {
		// Displays a dropdown menu.
		setDisplayDropDown(true);
	};

	return (
		<div className={styles.user} onClick={handleClick}>
			{user && <img className="userImage" src={user.profilePic} />}
			<span>{user.username}</span>
		</div>
	);
}

User.propTypes = {
	setDisplayDropDown: PropTypes.func,
};

export default User;
