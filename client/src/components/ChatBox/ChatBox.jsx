import { useSelector } from 'react-redux';

function ChatBox() {
	const friend = useSelector((state) => state.friend);

	return (
		<div>
			{Object.keys(friend).length === 1 ? (
				<span>Select a friend to begin chatting</span>
			) : (
				<span>{friend.username}</span>
			)}
		</div>
	);
}

export default ChatBox;
