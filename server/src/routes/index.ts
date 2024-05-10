import { Router } from 'express';
import { router as authRouter } from './auth.routes';
import { router as noteRouter } from './note.routes';

export const router = Router();

router.use('/auth', authRouter);
router.use('/note', noteRouter);
