import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.sql(
		`
    CREATE TABLE otps (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      otp INTEGER NOT NULL UNIQUE
    );
    `
	);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.sql('DROP TABLE otps;');
}
