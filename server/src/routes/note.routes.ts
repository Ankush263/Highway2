import { Router } from 'express';
import { protect } from '../controllers/authControllers';
import { createNote, getAllMyNotes } from '../controllers/noteControllers';

export const router = Router();

router.route('/').post(protect, createNote);
router.route('/').get(protect, getAllMyNotes);
