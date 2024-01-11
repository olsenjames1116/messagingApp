import { useSelector } from 'react-redux';
import { pencilImage } from '../../assets/images';

// Represents the form to change user information on the edit user page.
function EditUserForm() {
	const profilePic = useSelector((state) => state.user.profilePic);

	const handleChange = (event) => {
		const { id, value, files } = event.target;

		switch (id) {
			case 'profilePic':
				console.log(files[0]);
				break;
			case 'bio':
				console.log(value);
				break;
			default:
				console.log('none of these ids matched.');
		}
	};

	return (
		<form method="POST" action="">
			<div>
				<img src={profilePic} />
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
			/>
		</form>
	);
}

export default EditUserForm;
