import { useSelector } from 'react-redux';

function Sidebar() {
	const friends = useSelector((state) => state.user.friends);

	const handleClick = (event) => {
		event.preventDefault();
	};

	return (
		<section>
			<ul>
				<li>
					<button onClick={handleClick}>Add Friend</button>
				</li>
			</ul>
		</section>
	);
}

export default Sidebar;
