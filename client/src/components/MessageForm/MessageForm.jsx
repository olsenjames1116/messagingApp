import { useState, useRef } from 'react';
import InputMessages from '../InputMessages/InputMessages';
import api from '../../axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addMessagesBetweenUsers } from '../../redux/state/messagesBetweenUsers';

// Represents the message form in the chat box.
function MessageForm() {
	const friend = useSelector((state) => state.friend);
	const user = useSelector((state) => state.user);

	const [message, setMessage] = useState('');
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);
	const inputRef = useRef(null);

	const dispatch = useDispatch();

	// Check if inputs from the form are valid.
	const checkFormValidity = () => {
		if (!message.trim()) {
			// Reached if the message from the form is empty.
			inputMessagesRef.current.style.color = 'red';
			setInputMessages(['Cannot send an empty message.']);
			return false;
		} else {
			// Input from the form is valid.
			return true;
		}
	};

	// Reached after a successful call to the api.
	const handleSuccess = (response) => {
		// Store messages between users in state.
		const { messages } = response.data;
		dispatch(addMessagesBetweenUsers(messages));
	};

	// Store message in the backend.
	const sendMessage = async () => {
		try {
			const response = await api.post('/message/send-message', {
				to: friend._id,
				from: user._id,
				message: message,
			});
			handleSuccess(response);
		} catch (err) {
			if (err.response?.status === 400) {
				// Reached from a validation error from the backend. Display the validation error.
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([message]);
			} else {
				// A catch all to display errors to the console.
				console.log(err);
			}
		}
		setMessage('');
	};

	// Reached when the form is submitted.
	const handleSubmit = (event) => {
		event.preventDefault();
		setInputMessages([]);
		inputRef.current.value = '';

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			// Reached if front end validation passes.
			sendMessage();
		}
	};

	// Reached when a change is made to an input field.
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
