import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { searchImage } from '../../assets/images';
import api from '../../axiosConfig';
import InputMessages from '../InputMessages/InputMessages';

function FriendSearchMenu({ displayMenu, setDisplayMenu, menuRef }) {
	const [searchUsername, setSearchUsername] = useState('');
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (displayMenu && !menuRef?.current?.contains(event.target)) {
				setDisplayMenu(false);
			}
		});
	});

	const checkFormValidity = () => {
		if (!searchUsername.trim()) {
			inputMessagesRef.current.style.color = 'red';
			setInputMessages(['Enter a username.']);
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setInputMessages([]);
		inputRef.current.value = '';

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			try {
				const response = await api.get(`/user/search/${searchUsername}`);
				console.log(response);
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
		}
	};

	const handleChange = ({ target }) => {
		const { value } = target;

		setSearchUsername(value);
	};

	return (
		<section ref={menuRef}>
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
		</section>
	);
}

FriendSearchMenu.propTypes = {
	displayMenu: PropTypes.bool,
	setDisplayMenu: PropTypes.func,
	menuRef: PropTypes.object,
};

export default FriendSearchMenu;
