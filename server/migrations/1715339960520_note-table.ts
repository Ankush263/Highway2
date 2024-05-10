import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
	pgm.sql(
		`
    CREATE TABLE notes (
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      title VARCHAR(100) NOT NULL,
      text VARCHAR(500) NOT NULL
    );
    `
	);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
	pgm.sql('DELETE TABLE notes');
}
