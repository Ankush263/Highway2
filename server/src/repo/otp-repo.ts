import pool from '../pool';
import { toCamelCase } from './utils/to-camel-case';
import otpGenerator from 'otp-generator';

export class OtpRepo {
	static async create(user_id: number) {
		const otp = otpGenerator.generate(4, {
			upperCaseAlphabets: false,
			specialChars: false,
			lowerCaseAlphabets: false,
		});

		const { rows } = await pool.query(
			`
    INSERT INTO otps(user_id, otp)
    VALUES ($1, $2)
    RETURNING *
    `,
			[user_id, otp]
		);
		return toCamelCase(rows)[0];
	}

	static async findByUserId(user_id: number) {
		const { rows } = await pool.query('SELECT * FROM otps WHERE user_id = $1', [
			user_id,
		]);
		return toCamelCase(rows);
	}

	static async findByOtpAndUserId(otp: number, user_id: number) {
		const { rows } = await pool.query(
			'SELECT * FROM otps WHERE otp = $1 AND user_id = $2',
			[otp, user_id]
		);
		return toCamelCase(rows);
	}
}
