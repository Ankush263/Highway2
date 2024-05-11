import { Button } from 'react-bootstrap';

function NoteTitle() {
	return (
		<div className="note-title">
			<div className="note-box">
				<span>Lorem ipsum, dolor</span>
			</div>
			<Button variant="danger" style={{ height: '40px' }}>
				Delete
			</Button>
		</div>
	);
}

export default NoteTitle;
