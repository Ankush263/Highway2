import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { NextFunction, Request, Response } from 'express';
import { NoteRepo } from '../repo/note-repo';

export const createNote = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const { title, text } = req.body;

		if (!title || !text) {
			return next(new AppError('Note must contains a title and text', 404));
		}

		const note = await NoteRepo.create(req.user.id, title, text);

		res.status(200).json({
			status: 'success',
			data: note,
		});
	}
);

export const getAllNotes = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const notes = await NoteRepo.find();

		res.status(200).json({
			status: 'success',
			data: notes,
		});
	}
);

export const getAllMyNotes = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const notes = await NoteRepo.findByUserId(req.user.id);

		res.status(200).json({
			status: 'success',
			data: notes,
		});
	}
);
