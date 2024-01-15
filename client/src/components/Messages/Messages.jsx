import { useSelector } from 'react-redux';

// Represents the messages between users displayed in the chat box.
function Messages() {
	const messagesBetweenUsers = useSelector(
		(state) => state.messagesBetweenUsers
	);
	const user = useSelector((state) => state.user);

	return (
		<ul className="messages">
			{
				// Check if there is an array stored in state. If so, display the messages.
				Array.isArray(messagesBetweenUsers) &&
					messagesBetweenUsers?.map((message) => {
						if (message.from === user._id) {
							// This message is from the user.
							return (
								<li key={message._id} className="fromUser">
									{message.message}
								</li>
							);
						} else {
							// This message has been received by the user.
							return (
								<li key={message._id} className="toUser">
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
