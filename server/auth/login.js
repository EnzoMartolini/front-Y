import db from '../db.js';

export function loginUser(email, password) {
  const stmt = db.prepare(`
    SELECT * FROM users WHERE email = ? AND password = ?
  `);

  const user = stmt.get(email, password);

  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  return user;
}
