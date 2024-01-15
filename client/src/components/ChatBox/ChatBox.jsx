import { useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import MessageForm from '../MessageForm/MessageForm';

// Represents the chat box for users to message each other.
function ChatBox() {
	const friend = useSelector((state) => state.friend);

	return (
		<div className="chatBox">
			{
				// Only display chat box if a friend is selected.
				Object.keys(friend).length < 2 ? (
					// eslint-disable-next-line react/no-unescaped-entities
					<span>Let's get started! Select a friend to begin chatting.</span>
				) : (
					<>
						<h2>{friend.username}</h2>
						<Messages />
						<MessageForm />
					</>
				)
			}
		</div>
	);
}

export default ChatBox;
