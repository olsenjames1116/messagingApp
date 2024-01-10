import PropTypes from 'prop-types';

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
