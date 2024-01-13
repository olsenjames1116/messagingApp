import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import api from '../../axiosConfig';
import { updateFriends } from '../../redux/state/userSlice';

function FriendSearchResult({ friendSearchResult }) {
	const dispatch = useDispatch();

	const handleClick = async (event, user) => {
		event.preventDefault();
		console.log(user);

		try {
			const response = await api.post(`/user/add-friend/${user._id}`);
			console.log(response);

			const currentUser = JSON.parse(localStorage.getItem('user'));
			currentUser.friends.push({
				username: user.username,
				profilePic: user.profilePic,
				_id: user._id,
			});
			localStorage.setItem('user', JSON.stringify(currentUser));

			dispatch(
				updateFriends({
					username: user.username,
					profilePic: user.profilePic,
					_id: user._id,
				})
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ul>
			{friendSearchResult.map((result) => (
				<li key={result._id}>
					<img src={result.profilePic} />
					<span>{result.username}</span>
					<button onClick={(event) => handleClick(event, result)}>
						Add Friend
					</button>
				</li>
			))}
		</ul>
	);
}

FriendSearchResult.propTypes = {
	friendSearchResult: PropTypes.array,
};

export default FriendSearchResult;
