import { useSelector } from 'react-redux';

function User() {
	const user = useSelector((state) => state.user);

	return (
		<div className="user">
			<img src={user.profilePic} />
			<span>{user.username}</span>
		</div>
	);
}

export default User;
