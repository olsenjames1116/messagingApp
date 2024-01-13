import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { searchImage } from '../../assets/images';
import api from '../../axiosConfig';
import InputMessages from '../InputMessages/InputMessages';

function FriendSearchMenu({ displayMenu, setDisplayMenu, menuRef }) {
	const [searchUsername, setSearchUsername] = useState('');
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);

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

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			try {
				const response = await api.get(`/user/search/${searchUsername}`);
				console.log(response);
			} catch (err) {
				console.log(err);
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
