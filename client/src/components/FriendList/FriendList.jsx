import { useDispatch, useSelector } from 'react-redux';
import { upArrow } from '../../assets/images';
import { addFriend } from '../../redux/state/friendSlice';
import api from '../../axiosConfig';

function FriendList() {
	const friends = useSelector((state) => state.user.friends);

	const dispatch = useDispatch();

	const handleClick = async (friend) => {
		dispatch(addFriend(friend));

		try {
			const response = await api.get(`/message/${friend._id}`);
			const { messages } = response.data;
			console.log(messages);
		} catch (err) {
			// A catch to display errors to the console.
			console.log(err);
		}
	};

	return (
		<>
			{friends?.length === 0 && (
				<li>
					No friends yet. Add someone! <img src={upArrow} />
				</li>
			)}
			{friends?.map((friend) => (
				<li key={friend._id} onClick={() => handleClick(friend)}>
					<img src={friend.profilePic} />
					<span>{friend.username}</span>
				</li>
			))}
		</>
	);
}

export default FriendList;
