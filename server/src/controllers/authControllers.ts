import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';
import { UserRepo } from '../repo/user-repo';
import dotenv from 'dotenv';
import { NextFunction, Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { OtpRepo } from '../repo/otp-repo';
import pool from '../pool';

dotenv.config();

const signToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user: any, statusCode: number, res: Response) => {
	const token = signToken(user[0].id);

	const cookieOptions: {
		expires: Date;
		httpOnly: boolean;
		secure?: boolean;
	} = {
		expires: new Date(
			Date.now() +
				parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

export const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			username,
			email,
			password,
		}: {
			username: string;
			email: string;
			password: string;
		} = req.body;

		const existUser = await UserRepo.findByEmail(email);

		if (existUser.length > 0) {
			return next(new AppError('User with this email is already exists', 404));
		}

		if (!email || !password) {
			return next(new AppError('Please provide email and password', 404));
		}

		const hashedPasswoed: string = bcrypt.hashSync(password, 12);

		const newUser = await UserRepo.create(
			username,
			email,
			hashedPasswoed,
			false
		);

		createAndSendToken([newUser], 201, res);
	}
);

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password }: { email: string; password: string } = req.body;

		if (!email || !password) {
			return next(new AppError(`Please provide email and password`, 404));
		}

		const user: any = await UserRepo.findByEmail(email);

		if (!user[0] || !bcrypt.compareSync(password, user[0].password)) {
			return next(new AppError(`Incorrect email or password`, 401));
		}

		createAndSendToken(user, 200, res);
	}
);

export const protect = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		let token: string;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}
		if (!token) {
			return next(
				new AppError(`You aren't logged in! Please log in to get access`, 401)
			);
		}

		const decoded: any = jwt.decode(token);

		const freshUser = await UserRepo.findById(decoded.id);

		if (!freshUser) {
			return next(
				new AppError(
					`The user belonging to this token does no longer exist`,
					401
				)
			);
		}

		req.user = freshUser;

		next();
	}
);

export const getVarificationToken = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const id = req.params.id;

		const token = jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		res.status(200).json({
			status: 'success',
			data: token,
		});
	}
);

export const varifyToken = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const id = req.params.id;

		const token = req.params.token;

		const decoded: any = jwt.decode(token);

		if (decoded.id === id) {
			await pool.query(
				`
				UPDATE users
				SET active = true, updated_at = CURRENT_TIMESTAMP
				WHERE id = $1
				RETURNING *;
				`,
				[req.user.id]
			);
			res.status(200).json({
				status: 'success',
				data: 'success',
			});
		} else {
			return next(new AppError('Varification failed', 404));
		}
	}
);

export const getOtp = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const createOTP = OtpRepo.create(req.user.id);

		res.status(200).json({
			status: 'success',
			data: createOTP,
		});
	}
);

export const matchOTP = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const { otp } = req.body;
		const user = await UserRepo.findById(req.user.id);
		const matchedOTP = await OtpRepo.findByOtpAndUserId(otp, req.user.id);

		if (matchedOTP.length > 0) {
			createAndSendToken(user, 201, res);
		} else {
			return next(new AppError('Wrong OTP!!!', 401));
		}

		const updatedUser = await pool.query(
			`
      UPDATE users
      SET active = true, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
      `,
			[req.user.id]
		);

		res.status(200).json({
			status: 'success',
			data: updatedUser,
		});
	}
);

export const getMe = catchAsync(
	async (req: Request | any, res: Response, next: NextFunction) => {
		const me = await UserRepo.findById(req.user.id);

		res.status(200).json({
			status: 'success',
			data: me,
		});
	}
);
