import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import api from '../../axiosConfig';
import { useSelector } from 'react-redux';

function MessageForm() {
	const friend = useSelector((state) => state.friend);
	const user = useSelector((state) => state.user);

	const [message, setMessage] = useState('');
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);
	const inputRef = useRef(null);

	const checkFormValidity = () => {
		if (!message.trim()) {
			inputMessagesRef.current.style.color = 'red';
			setInputMessages(['Cannot send an empty message.']);
			return false;
		} else {
			return true;
		}
	};

	const sendMessage = async () => {
		try {
			await api.post('/message/send-message', {
				to: friend._id,
				from: user._id,
				message: message,
			});
		} catch (err) {
			if (err.response?.status === 400) {
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([message]);
			} else {
				console.log(err);
			}
		}
		setMessage('');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);
		inputRef.current.value = '';

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			sendMessage();
		}
	};

	const handleChange = ({ target }) => {
		const { value } = target;

		setMessage(value);
	};

	return (
		<form method="POST" action="" onSubmit={handleSubmit}>
			<textarea
				id="message"
				name="message"
				placeholder="Send message..."
				onChange={handleChange}
				ref={inputRef}
			/>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<button>Send</button>
		</form>
	);
}

export default MessageForm;
