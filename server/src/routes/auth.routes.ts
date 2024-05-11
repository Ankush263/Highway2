import { Router } from 'express';
import {
	signup,
	login,
	protect,
	getOtp,
	matchOTP,
	getVarificationToken,
	varifyToken,
} from '../controllers/authControllers';

export const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/getOtp').post(protect, getOtp);
router.route('/varifyOtp').post(protect, matchOTP);

router.route('/getToken').get(protect, getVarificationToken);
router.route('/varifyToken/:token').get(protect, varifyToken);
