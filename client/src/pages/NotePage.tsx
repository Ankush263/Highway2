import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getSingleNote, updateNote } from '../api';
import Cookies from 'js-cookie';

function NotePage() {
	const [noteTitle, setNoteTitle] = useState('');
	const [noteText, setNoteText] = useState('');

	const data: { id: string } = useParams();
	const history = useHistory();

	const fetchNote = useCallback(async () => {
		try {
			const token = Cookies.get('Token');
			const response = await getSingleNote(token as string, parseInt(data?.id));
			setNoteTitle(response.data.data.title);
			setNoteText(response.data.data.text);
		} catch (error) {
			console.log(error);
		}
	}, [data?.id]);

	const handleUpdate = async () => {
		try {
			const token = Cookies.get('Token');
			await updateNote(token as string, parseInt(data?.id), {
				title: noteTitle,
				text: noteText,
			});
			history.go(0);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchNote();
	}, [data, fetchNote]);
	return (
		<div className="note-page">
			<Form.Control
				placeholder="Title"
				aria-label="Title"
				aria-describedby="basic-addon2"
				style={{ marginTop: '20px', width: '400px', marginBottom: '20px' }}
				value={noteTitle}
				onChange={(e) => setNoteTitle(e.target.value)}
			/>
			<FloatingLabel
				controlId="floatingTextarea2"
				label="Enter text"
				className="mb-3"
			>
				<Form.Control
					as="textarea"
					placeholder="Leave a text here"
					style={{ minHeight: '300px', width: '400px' }}
					value={noteText}
					onChange={(e) => setNoteText(e.target.value)}
				/>
			</FloatingLabel>
			<Button variant="success" onClick={handleUpdate} className="mb-5">
				Save
			</Button>
		</div>
	);
}

export default NotePage;
