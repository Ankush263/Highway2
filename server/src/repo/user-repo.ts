import pool from '../pool';
import { toCamelCase } from './utils/to-camel-case';

export class UserRepo {
	static async create(
		username: string,
		email: string,
		password: string,
		active: boolean
	) {
		const { rows } = await pool.query(
			`
      INSERT INTO users(username, email, password, active)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
			[username, email, password, active]
		);
		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM users');
		return toCamelCase(rows);
	}

	static async findByEmail(email: string) {
		const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);
		return toCamelCase(rows);
	}

	static async findById(id: string) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows);
	}

	static async findByIdAndUpdate(id: string, username: string, email: string) {
		const { rows } = await pool.query(
			`
    UPDATE users
    SET
      username = COALESCE($2, username),
      email = COALESCE($3, email)
    WHERE id = $1
    `,
			[id, username, email]
		);
		return toCamelCase(rows);
	}
}
