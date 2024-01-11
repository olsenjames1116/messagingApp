import PropTypes from 'prop-types';

// Represents the messages that displayed on forms after input is validated.
function InputMessages({ messages, inputMessagesRef }) {
	return (
		<ul className="inputMessages" ref={inputMessagesRef}>
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>;
			})}
		</ul>
	);
}

InputMessages.propTypes = {
	messages: PropTypes.array,
	inputMessagesRef: PropTypes.object,
};

export default InputMessages;
