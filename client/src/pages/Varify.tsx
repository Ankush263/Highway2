import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { varifyToken } from '../api';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Varify() {
	const data: { url: string } = useParams();
	const history = useHistory();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetch = async () => {
		try {
			const token = Cookies.get('Token');
			await varifyToken(token as string, data.url);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, [data, fetch]);

	return (
		<div className="note-page">
			<h1>Your email is varified succesfully</h1>
			<Button onClick={() => history.replace('/')}>Go Home</Button>
		</div>
	);
}

export default Varify;
