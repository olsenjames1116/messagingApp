import { useSelector } from 'react-redux';
import { pencilImage } from '../../assets/images';

// Represents the form to change user information on the edit user page.
function EditUserForm() {
	const profilePic = useSelector((state) => state.user.profilePic);

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
				/>
			</div>
			<textarea name="bio" id="bio" cols="30" rows="10" />
		</form>
	);
}

export default EditUserForm;
