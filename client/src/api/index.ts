import axios from 'axios';

const URL = 'http://localhost:8000';

const AUTH_URL = `${URL}/api/v1/auth`;
const NOTE_URL = `${URL}/api/v1/note`;

const AUTH_API = axios.create({ baseURL: AUTH_URL });
const NOTE_API = axios.create({ baseURL: NOTE_URL });

export const signup = (details: {
	username: string;
	email: string;
	password: string;
}) => AUTH_API.post('/signup', details);

export const login = (details: { email: string; password: string }) =>
	AUTH_API.post('/login', details);

export const getMe = (_token: string) =>
	AUTH_API.get('/me', { headers: { Authorization: `Bearer ${_token}` } });

export const getToken = (_token: string) =>
	AUTH_API.get('/getToken', { headers: { Authorization: `Bearer ${_token}` } });

export const varifyToken = (_token: string, varificationToken: string) =>
	AUTH_API.get(`/varifyToken/${varificationToken}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const createNote = (
	_token: string,
	details: { title: string; text: string }
) =>
	NOTE_API.post('/', details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAllNotes = (_token: string) =>
	NOTE_API.get('/', {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const deleteNote = (_token: string, id: number) =>
	NOTE_API.delete(`/${id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getSingleNote = (_token: string, id: number) =>
	NOTE_API.get(`/${id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const updateNote = (
	_token: string,
	id: number,
	details: { title: string; text: string }
) =>
	NOTE_API.patch(`/${id}`, details, {
		headers: { Authorization: `Bearer ${_token}` },
	});
