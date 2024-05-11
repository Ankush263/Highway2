import { Button } from 'react-bootstrap';
import { deleteNote } from '../../api';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';

function NoteTitle({ t, id }: { t: string; id: number }) {
	const history = useHistory();

	const handleDeleteNote = async () => {
		try {
			const token = Cookies.get('Token');

			await deleteNote(token as string, id);
			history.go(0);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="note-title">
			<Link to={`/${id}`} style={{ textDecoration: 'none' }}>
				<div className="note-box">
					<span style={{ color: 'black' }}>{t}</span>
				</div>
			</Link>
			<Button
				variant="danger"
				onClick={handleDeleteNote}
				style={{ height: '40px', color: 'white' }}
			>
				Delete
			</Button>
		</div>
	);
}

export default NoteTitle;
