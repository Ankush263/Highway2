import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function CreateNote() {
	return (
		<div className="note-component">
			<InputGroup className="mb-3">
				<InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
				<Form.Control
					placeholder="Title"
					aria-label="Title"
					aria-describedby="basic-addon1"
					width={'200px'}
					maxLength={4}
				/>
			</InputGroup>
			<Button variant="primary" style={{ width: '150px', height: '40px' }}>
				Create
			</Button>
		</div>
	);
}

export default CreateNote;
