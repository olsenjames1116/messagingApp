import { useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import MessageForm from '../MessageForm/MessageForm';
import styles from './ChatBox.module.css';

// Represents the chat box for users to message each other.
function ChatBox() {
	const friend = useSelector((state) => state.friend);

	return (
		<div className={styles.chatBox}>
			{
				// Only display chat box if a friend is selected.
				Object.keys(friend).length < 2 ? (
					// eslint-disable-next-line react/no-unescaped-entities
					<span>Let's get started! Select a friend to begin chatting.</span>
				) : (
					<div className={styles.friendSelected}>
						<h2>{friend.username}</h2>
						<Messages />
						<MessageForm />
					</div>
				)
			}
		</div>
	);
}

export default ChatBox;
