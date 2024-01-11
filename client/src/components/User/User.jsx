import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function User({ setDisplayDropDown }) {
	const user = useSelector((state) => state.user);

	const handleClick = () => {
		setDisplayDropDown(true);
	};

	return (
		<div className="user" onClick={handleClick}>
			<img src={user.profilePic} />
			<span>{user.username}</span>
		</div>
	);
}

User.propTypes = {
	setDisplayDropDown: PropTypes.func,
};

export default User;
