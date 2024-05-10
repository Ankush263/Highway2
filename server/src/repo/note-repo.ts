import pool from '../pool';
import { toCamelCase } from './utils/to-camel-case';

export class NoteRepo {
	static async create(user_id: number, title: string, text: string) {
		const { rows } = await pool.query(
			`
      INSERT INTO notes(user_id, title, text)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
			[user_id, title, text]
		);

		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM notes');

		return toCamelCase(rows);
	}

	static async findById(id: number) {
		const { rows } = await pool.query('SELECT * FROM notes WHERE id = $1', [
			id,
		]);

		return toCamelCase(rows)[0];
	}

	static async findByUserId(user_id: number) {
		const { rows } = await pool.query(
			'SELECT * FROM notes WHERE user_id = $1',
			[user_id]
		);

		return toCamelCase(rows);
	}

	static async delete(id: number) {
		const { rows } = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
		return toCamelCase(rows);
	}
}
