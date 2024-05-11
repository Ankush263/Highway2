import { Router } from 'express';
import { protect } from '../controllers/authControllers';
import {
	createNote,
	getAllMyNotes,
	deleteNote,
	getSingleNote,
	updateNote,
} from '../controllers/noteControllers';

export const router = Router();

router.route('/').post(protect, createNote);
router.route('/').get(protect, getAllMyNotes);

router
	.route('/:id')
	.delete(protect, deleteNote)
	.get(protect, getSingleNote)
	.patch(protect, updateNote);
