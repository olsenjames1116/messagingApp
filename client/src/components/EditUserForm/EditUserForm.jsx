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
	const [tempProfilePic, setTempProfilePic] = useState(
		`/src/assets/uploads/${profilePic}`
	);

	const inputMessagesRef = useRef(null);

	const dispatch = useDispatch();

	// Check if inputs from the form are valid.
	const checkFormValidity = () => {
		// if (!newProfilePic.includes('image')) {
		// 	// Reached if the file from the form is not an image.
		// 	inputMessagesRef.current.style.color = 'red';
		// 	setInputMessages(['Files is not of type image.']);
		// 	return false;
		// } else {
		// Input from the form is valid.
		return true;
		// }
	};

	const convertInputToForm = () => {
		const formData = new FormData();
		formData.append('bio', newBio);
		formData.append('profilePic', newProfilePic);

		return formData;
	};

	// Update the user's info in the backend.
	const updateUserInfo = async () => {
		try {
			const formData = convertInputToForm();
			for (const pair of formData.entries()) {
				console.log(`${pair[0]}, ${pair[1]}`);
			}
			const response = await api.put('/user/update-info', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			// Anything below here is reached on a successful call to the backend.
			dispatch(updatePhoto(response.data.image));
			dispatch(updateBio(newBio));
		} catch (err) {
			if (err.response?.status === 400) {
				// Reached from a validation error from the backend. Display the validation error.
				const { message } = err.response.data;
				inputMessagesRef.current.style.color = 'red';
				setInputMessages([...message]);
			} else {
				// A catch all to display errors to the console.
				console.log(err);
			}
		}
	};

	// Reached when the form is submitted.
	const handleSubmit = async (event) => {
		event.preventDefault();
		setInputMessages([]);

		const formIsValid = checkFormValidity();

		if (formIsValid) {
			// Reached if front validation passes.
			updateUserInfo();
		}
	};

	// Convert an image to base64 for storage in the db.
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

	// Reached when a change is made to an input field.
	const handleChange = async (event) => {
		const { id, value, files } = event.target;

		// Determines which field was changed to store in state.
		switch (id) {
			case 'profilePic':
				setNewProfilePic(files[0]);
				setTempProfilePic(await convertToBase64(files[0]));
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
				<img src={tempProfilePic} />
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
