import { useDispatch, useSelector } from 'react-redux';
import { upArrow } from '../../assets/images';
import { addFriend } from '../../redux/state/friendSlice';
import api from '../../axiosConfig';
import { addMessagesBetweenUsers } from '../../redux/state/messagesBetweenUsers';
import styles from './FriendList.module.css';

function FriendList() {
	const friends = useSelector((state) => state.user.friends);

	const dispatch = useDispatch();

	// Reached after a successful call to the api.
	const handleSuccess = (response) => {
		// Store messages between users in state.
		const { messages } = response.data;
		dispatch(addMessagesBetweenUsers(messages));
	};

	// Get all messages between users.
	const getMessagesBetweenUsers = async (friend) => {
		try {
			const response = await api.get(`/message/${friend._id}`);
			// Anything below here is reached from a successful call to the api.
			handleSuccess(response);
		} catch (err) {
			// A catch to display errors to the console.
			console.log(err);
		}
	};

	// Reached after a friend is clicked on.
	const handleClick = (friend) => {
		dispatch(addFriend(friend));
		getMessagesBetweenUsers(friend);
	};

	return (
		<>
			{
				// If a the user has no friends, display a message.
				friends?.length === 0 && (
					<li>
						No friends yet. Add someone! <img src={upArrow} />
					</li>
				)
			}
			{
				// The user has friends. Display their friends.
				friends?.map((friend) => (
					<li
						className={styles.friendContainer}
						key={friend._id}
						onClick={() => handleClick(friend)}
					>
						<img className="userImage" src={friend.profilePic} />
						<span>{friend.username}</span>
					</li>
				))
			}
		</>
	);
}

export default FriendList;
