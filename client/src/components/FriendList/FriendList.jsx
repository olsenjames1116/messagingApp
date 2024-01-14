import { useDispatch, useSelector } from 'react-redux';
import { upArrow } from '../../assets/images';
import { addFriend } from '../../redux/state/friendSlice';

function FriendList() {
	const friends = useSelector((state) => state.user.friends);

	const dispatch = useDispatch();

	const handleClick = (friend) => {
		dispatch(addFriend(friend));
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
