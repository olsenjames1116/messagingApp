import { useSelector } from 'react-redux';

function Messages() {
	const messagesBetweenUsers = useSelector(
		(state) => state.messagesBetweenUsers
	);
	const user = useSelector((state) => state.user);

	return (
		<ul className="messages">
			{Array.isArray(messagesBetweenUsers) &&
				messagesBetweenUsers?.map((message) => {
					if (message.from === user._id) {
						return (
							<li key={message._id} className="fromUser">
								{message.message}
							</li>
						);
					} else {
						return (
							<li key={message._id} className="toUser">
								{message.message}
							</li>
						);
					}
				})}
		</ul>
	);
}

export default Messages;
