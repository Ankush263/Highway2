import CreateNote from '../components/notes/CreateNote';
import NoteTitle from '../components/notes/NoteTitle';
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { getMe, getAllNotes } from '../api';
import { Spinner } from 'react-bootstrap';

interface Note {
	id: number;
	title: string;
}

function NotesListingPage() {
	const [load, setLoad] = useState(false);
	const [allNotes, setAllNotes] = useState<Note[]>([]);

	const history = useHistory();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchUser = useCallback(async () => {
		try {
			const token = Cookies.get('Token');

			const response = await getMe(token as string);
			const user = response.data.data;

			if (!user.active) {
				history.replace('/auth');
			}
			setLoad(false);
		} catch (error) {
			console.log(error);
		}
	}, [history]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchAllNotes = useCallback(async () => {
		try {
			const token = Cookies.get('Token');

			const response = await getAllNotes(token as string);
			setAllNotes(response.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		setLoad(true);
		const token = Cookies.get('Token');
		if (!token) {
			history.replace('/auth');
		}
		fetchUser();
		fetchAllNotes();
	}, [fetchUser, history, fetchAllNotes]);

	return (
		<div className="note-page">
			<CreateNote />
			{load ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
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
						{allNotes.map((note) => {
							return <NoteTitle key={note.id} t={note.title} id={note.id} />;
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default NotesListingPage;
