import PropTypes from 'prop-types';

function InputMessages({ messages }) {
	return (
		<ul className="inputMessages">
			{messages.map((message, index) => {
				return <li key={index}>{message}</li>;
			})}
		</ul>
	);
}

InputMessages.propTypes = {
	messages: PropTypes.array,
};

export default InputMessages;
