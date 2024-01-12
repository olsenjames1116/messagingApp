import { useDispatch, useSelector } from 'react-redux';
import { pencilImage } from '../../assets/images';
import { updatePhoto, updateBio } from '../../redux/state/userSlice';
import { useRef, useState } from 'react';
import api from '../../axiosConfig';
import InputMessages from '../InputMessages/InputMessages';

// Represents the form to change user information on the edit user page.
function EditUserForm() {
	const profilePic = useSelector((state) => state.user.profilePic);
	const bio = useSelector((state) => state.user.bio);

	const [newProfilePic, setNewProfilePic] = useState(profilePic);
	const [newBio, setNewBio] = useState(bio);
	const [inputMessages, setInputMessages] = useState([]);

	const inputMessagesRef = useRef(null);

	const dispatch = useDispatch();

	const checkFormValidity = () => {
		if (!newProfilePic.includes('image')) {
			inputMessagesRef.current.style.color = 'red';
			setInputMessages(['Files is not of type image.']);
			return false;
		} else {
			return true;
		}
	};

	const updateUserInfo = async () => {
		try {
			const response = await api.put('/user/update-info', {
				bio: newBio,
				profilePic: newProfilePic,
			});
			console.log(response);
			dispatch(updatePhoto(newProfilePic));
			dispatch(updateBio(newBio));
		} catch (err) {
			if (err.response.status === 400) {
				console.log('invalid file type.');
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([...message]);
			} else {
				console.log(err);
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setInputMessages([]);

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			updateUserInfo();
		}
	};

	const convertToBase64 = async (image) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(image);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleChange = async (event) => {
		const { id, value, files } = event.target;

		switch (id) {
			case 'profilePic':
				setNewProfilePic(await convertToBase64(files[0]));
				break;
			case 'bio':
				setNewBio(value);
				break;
			default:
				console.log('None of these ids matched.');
		}
	};

	return (
		<form method="POST" action="" onSubmit={handleSubmit}>
			<InputMessages
				messages={inputMessages}
				inputMessagesRef={inputMessagesRef}
			/>
			<div>
				<img src={newProfilePic} />
				<label htmlFor="profilePic">
					<img src={pencilImage} />
				</label>
				<input
					type="file"
					id="profilePic"
					name="profilePic"
					style={{ display: 'none' }}
					onChange={handleChange}
				/>
			</div>
			<textarea
				name="bio"
				id="bio"
				cols="30"
				rows="10"
				onChange={handleChange}
				defaultValue={newBio}
			/>
			<button>Submit</button>
		</form>
	);
}

export default EditUserForm;
