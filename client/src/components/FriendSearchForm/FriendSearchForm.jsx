import InputMessages from '../InputMessages/InputMessages';
import { searchImage } from '../../assets/images';
import api from '../../axiosConfig';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Represents the form to search for users.
function FriendSearchForm({ setFriendSearchResult }) {
	const [searchUsername, setSearchUsername] = useState('');
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);
	const inputRef = useRef(null);

	// Check if inputs from the form are valid.
	const checkFormValidity = () => {
		if (!searchUsername.trim()) {
			// Reached if the search input for username is empty.
			inputMessagesRef.current.style.color = 'red';
			setInputMessages(['Enter a username.']);
			return false;
		} else {
			// Input from the form is valid.
			return true;
		}
	};

	// Search for the user in the db.
	const searchForUser = async () => {
		try {
			const response = await api.get(`/user/search/${searchUsername}`);
			const { user } = response.data;
			console.log(user);
			setFriendSearchResult([user]);
		} catch (err) {
			if (err.response?.status === 400) {
				// Reached from the user not being found in the backend.
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([message]);
			} else {
				// A catch all to display errors to the console.
				console.log(err);
			}
		}
		setSearchUsername('');
	};

	// Reached when the form is submitted.
	const handleSubmit = async (event) => {
		event.preventDefault();
		setInputMessages([]);
		inputRef.current.value = '';
		setFriendSearchResult([]);

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			// Reached if front end validation passes.
			searchForUser();
		}
	};

	// Reached when a change is made to an input field.
	const handleChange = ({ target }) => {
		const { value } = target;

		setSearchUsername(value.split(' ').join(''));
	};

	return (
		<form method="GET" action="" onSubmit={handleSubmit}>
			<label htmlFor="user">
				<img src={searchImage} />
			</label>
			<input
				type="text"
				name="user"
				id="user"
				placeholder="Search for user..."
				onChange={handleChange}
				ref={inputRef}
			/>
			<button>Submit</button>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
		</form>
	);
}

FriendSearchForm.propTypes = {
	setFriendSearchResult: PropTypes.func,
};

export default FriendSearchForm;
