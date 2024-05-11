import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { NextFunction, Request, Response } from 'express';
import { NoteRepo } from '../repo/note-repo';

export const createNote = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const { title, text } = req.body;

		if (!title) {
			return next(new AppError('Note must contains a title', 404));
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

export const deleteNote = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const note = await NoteRepo.delete(req.params.id);

		if (!note) {
			return next(new AppError('Note does not exists', 404));
		}

		res.status(201).json({
			status: 'success',
			data: null,
		});
	}
);

export const getSingleNote = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const note: any = await NoteRepo.findById(req.params.id);

		if (note.userId !== req.user.id) {
			return next(new AppError(`You are not the owner of this note`, 404));
		}

		if (!note) {
			return next(new AppError('Note does not exists', 404));
		}

		res.status(201).json({
			status: 'success',
			data: note,
		});
	}
);

export const updateNote = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const note: any = await NoteRepo.findById(req.params.id);

		if (note.userId !== req.user.id) {
			return next(new AppError(`You are not the owner of this note`, 404));
		}

		const { title, text } = req.body;

		const updatedNote = await NoteRepo.findByIdAndUpdate(
			req.params.id,
			title,
			text
		);

		res.status(201).json({
			status: 'success',
			data: updatedNote,
		});
	}
);
