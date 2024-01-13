import { useSelector } from 'react-redux';
import { upArrow } from '../../assets/images';
import PropTypes from 'prop-types';

function Sidebar({ setDisplayMenu }) {
	const friends = useSelector((state) => state.user.friends);

	const handleClick = (event) => {
		event.preventDefault();

		setDisplayMenu(true);
	};

	return (
		<section>
			<ul>
				<li>
					<button onClick={handleClick}>Add Friend</button>
				</li>
				{friends?.length === 0 && (
					<li>
						No friends yet. Add someone! <img src={upArrow} />
					</li>
				)}
				{friends?.map((friend) => (
					<li key={friend._id}>{friend.username}</li>
				))}
			</ul>
		</section>
	);
}

Sidebar.propTypes = {
	setDisplayMenu: PropTypes.func,
};

export default Sidebar;
