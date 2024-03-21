import { useSelector } from 'react-redux';
import styles from './Messages.module.css';
import { useRef, useEffect } from 'react';

// Represents the messages between users displayed in the chat box.
function Messages() {
	const messagesRef = useRef(null);

	const messagesBetweenUsers = useSelector(
		(state) => state.messagesBetweenUsers
	);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
	});

	return (
		<ul className={styles.messages} ref={messagesRef}>
			{
				// Check if there is an array stored in state. If so, display the messages.
				Array.isArray(messagesBetweenUsers) &&
					messagesBetweenUsers?.map((message) => {
						if (message.from === user._id) {
							// This message is from the user.
							return (
								<li
									key={message._id}
									className={`${styles.fromUser} ${styles.message}`}
								>
									{message.message}
								</li>
							);
						} else {
							// This message has been received by the user.
							return (
								<li
									key={message._id}
									className={`${styles.toUser} ${styles.message}`}
								>
									{message.message}
								</li>
							);
						}
					})
			}
		</ul>
	);
}

export default Messages;
