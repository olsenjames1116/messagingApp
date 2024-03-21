import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../axiosConfig';
import { updateFriends } from '../../redux/state/userSlice';
import styles from './FriendSearchResult.module.css';

// Represents the result returned from searching for friends.
function FriendSearchResult({ friendSearchResult }) {
	const friends = useSelector((state) => state.user.friends);

	const dispatch = useDispatch();

	// Adds a friend to store in the db.
	const addFriend = async (user) => {
		try {
			await api.post(`/user/add-friend/${user._id}`);
			// Anything below here is reached from a successful call to the api.
			// Add the new friend to localStorage.
			const currentUser = JSON.parse(localStorage.getItem('user'));
			currentUser.friends.push({
				username: user.username,
				profilePic: user.profilePic,
				_id: user._id,
			});
			localStorage.setItem('user', JSON.stringify(currentUser));

			// Store the new friend in state.
			dispatch(
				updateFriends({
					username: user.username,
					profilePic: user.profilePic,
					_id: user._id,
				})
			);
		} catch (err) {
			// A catch all to display errors to the console.
			console.log(err);
		}
	};

	// Reached when the add friend button was been clicked.
	const handleClick = async (event, user) => {
		event.preventDefault();

		addFriend(user);
	};

	return (
		<ul className={styles.results}>
			{
				// For each result, display their name and profile picture.
				friendSearchResult?.map((result) => (
					<li className={styles.result} key={result._id}>
						<img src={result.profilePic} />
						<span>{result.username}</span>
						{
							// Determine if the user is already a friend. If so, do not allow them to be added again.
							friends?.filter((friend) => friend._id === result._id).length >
							0 ? (
								<button disabled>Already Added</button>
							) : (
								<button onClick={(event) => handleClick(event, result)}>
									+Add Friend
								</button>
							)
						}
					</li>
				))
			}
		</ul>
	);
}

FriendSearchResult.propTypes = {
	friendSearchResult: PropTypes.array,
};

export default FriendSearchResult;
