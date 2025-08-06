import db from '../db.js';

export function registerUser(username, email, password) {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `);

  try {
    const info = stmt.run(username, email, password);
    return { id: info.lastInsertRowid, username, email };
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      throw new Error('Email déjà utilisé');
    }
    throw err;
  }
}
