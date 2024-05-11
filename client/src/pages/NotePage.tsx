import { Button, FloatingLabel, Form } from 'react-bootstrap';

function NotePage() {
	return (
		<div className="note-page">
			<div className="note-box" style={{ marginTop: '20px' }}>
				<span>This is a demo title</span>
			</div>
			<FloatingLabel
				controlId="floatingTextarea2"
				label="Enter text"
				className="mb-3"
			>
				<Form.Control
					as="textarea"
					placeholder="Leave a text here"
					style={{ height: '600px', width: '400px' }}
				/>
			</FloatingLabel>
			<Button variant="success" className="mb-5">
				Save
			</Button>
		</div>
	);
}

export default NotePage;
