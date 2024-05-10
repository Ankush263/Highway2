import { Router } from 'express';
import {
	signup,
	login,
	protect,
	getOtp,
	matchOTP,
} from '../controllers/authControllers';

export const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/getOtp').post(protect, getOtp);
router.route('/varifyOtp').post(protect, matchOTP);
