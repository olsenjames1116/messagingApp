import Header from '../Header/Header';
import EditUserForm from '../EditUserForm/EditUserForm';

// Represents the page on which the user can edit their profile.
function EditUserPage() {
	return (
		<>
			<Header />
			<main>
				<div className="content">
					<EditUserForm />
				</div>
			</main>
		</>
	);
}

export default EditUserPage;
