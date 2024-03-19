import { Link } from 'react-router-dom';
import { logo } from '../../assets/images';
import styles from './Logo.module.css';

// Represents the logo at the top of the page.
function Logo() {
	return (
		<Link to="/">
			<div className={styles.logo}>
				<img src={logo} alt="" />
				<span>Hermes</span>
			</div>
		</Link>
	);
}

export default Logo;
