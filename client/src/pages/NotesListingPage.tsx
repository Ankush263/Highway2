import CreateNote from '../components/notes/CreateNote';
import NoteTitle from '../components/notes/NoteTitle';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function NotesListingPage() {
	const history = useHistory();

	useEffect(() => {
		const token = Cookies.get('Token');
		if (!token) {
			history.replace('/auth');
		}
	}, [history]);

	return (
		<div className="note-page">
			<CreateNote />
			<div style={{ marginTop: '20px' }}>
				<span style={{ fontWeight: '700', fontSize: '25px' }}>My Notes</span>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '500px',
						maxHeight: '80vh',
						overflowY: 'scroll',
					}}
				>
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
					<NoteTitle />
				</div>
			</div>
		</div>
	);
}

export default NotesListingPage;
