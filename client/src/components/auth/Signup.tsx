import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { signup } from '../../api';
import { Alert, Spinner } from 'react-bootstrap';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

function Signup({ setLogin }: { setLogin: (prevState: boolean) => void }) {
	const [validated, setValidated] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertTxt, setAlertTxt] = useState('');
	const [alertType, setAlertType] = useState('danger');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		try {
			setLoading(true);
			const form = event.currentTarget;
			if (form.checkValidity() === false) {
				event.preventDefault();
				event.stopPropagation();
				setValidated(true);
				setLoading(false);
				return;
			}
			event.preventDefault();
			setAlert(false);
			const target = event.target as HTMLFormElement;

			const username = target.username.value;
			const email = target.email.value;
			const password = target.password.value;

			const response = await signup({ username, email, password });

			const token = response.data.token;
			Cookies.set('Token', token);
			setAlert(true);
			setAlertTxt('We have sent you an email varification link.');
			setAlertType('success');
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			setAlert(true);
			setAlertType('danger');
			if (error instanceof AxiosError) {
				setAlertTxt(error.response?.data.message);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<div
				style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
			>
				<span style={{ fontWeight: '700', fontSize: '25px' }}>Sign Up</span>
			</div>
			<div className="signup-form">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter username"
							name="username"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid username.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid Email.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							name="password"
							required
							minLength={8}
						/>
						<Form.Control.Feedback type="invalid">
							Password must have 8 characters
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" type="submit" style={{ width: '100%' }}>
						{loading ? (
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
						) : (
							'Sign Up'
						)}
					</Button>
					<Form.Group
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Form.Label>
							Already have an account,{' '}
							<Button variant="link" onClick={() => setLogin(true)}>
								Login
							</Button>
						</Form.Label>
					</Form.Group>
				</Form>
				{alert ? <Alert variant={alertType}>{alertTxt}</Alert> : ''}
			</div>
		</div>
	);
}

export default Signup;
