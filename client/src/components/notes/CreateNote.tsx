import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { createNote } from '../../api';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function CreateNote() {
	const [validated, setValidated] = useState(false);
	const history = useHistory();

	const handleCreateNote = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			const form = event.currentTarget;
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
				setValidated(true);
				return;
			}
			event.preventDefault();
			const target = event.target as HTMLFormElement;
			const token = Cookies.get('Token');
			const title = (target.querySelector('[name="title"]') as HTMLInputElement)
				.value;
			await createNote(token as string, { title, text: '' });
			history.go(0);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="note-component">
			<Form
				noValidate
				validated={validated}
				onSubmit={handleCreateNote}
				className="note-component"
			>
				<InputGroup className="mb-3">
					<InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
					<Form.Control
						placeholder="Title"
						aria-label="Title"
						aria-describedby="basic-addon1"
						width={'200px'}
						minLength={4}
						name="title"
					/>
					<Form.Control.Feedback type="invalid">
						Title should be atleast 4 digit long
					</Form.Control.Feedback>
				</InputGroup>
				<Button
					variant="primary"
					type="submit"
					style={{ width: '150px', height: '40px' }}
				>
					Create
				</Button>
			</Form>
		</div>
	);
}

export default CreateNote;
