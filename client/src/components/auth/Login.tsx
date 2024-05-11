import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { login } from '../../api';
import { Alert, Spinner } from 'react-bootstrap';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

function Login({ setLogin }: { setLogin: (prevState: boolean) => void }) {
	const [validated, setValidated] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertTxt, setAlertTxt] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

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

			const email = target.email.value;
			const password = target.password.value;

			const response = await login({ email, password });

			const token = response.data.token;
			Cookies.set('Token', token);
			setLoading(false);
			history.replace('/');
		} catch (error) {
			console.log(error);
			setLoading(false);
			setAlert(true);
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
				<span style={{ fontWeight: '700', fontSize: '25px' }}>Login</span>
			</div>
			<div className="signup-form">
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							required
							name="email"
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
							required
							minLength={8}
							name="password"
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
							'Login'
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
							Don't have an account
							<Button variant="link" onClick={() => setLogin(false)}>
								signup
							</Button>
						</Form.Label>
					</Form.Group>
				</Form>
				{alert ? <Alert variant={'danger'}>{alertTxt}</Alert> : ''}
			</div>
		</div>
	);
}

export default Login;
