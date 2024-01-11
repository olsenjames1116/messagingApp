import { Link } from 'react-router-dom';

// Represents the logo at the top of the page.
function Logo() {
	return (
		<Link to="/">
			<div className="logo">Logo</div>
		</Link>
	);
}

export default Logo;
