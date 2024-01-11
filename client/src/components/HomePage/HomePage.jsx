import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import Header from '../Header/Header';

function HomePage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Home Page';

		const fetchData = async () => {
			try {
				await api.get('/user/verifyToken');
			} catch (err) {
				if (err.response.status === 403) {
					navigate('/log-in');
				} else {
					console.log(err);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Header />
			<main>
				<div className="content">Home Page</div>
			</main>
		</>
	);
}

export default HomePage;
