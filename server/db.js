import Database from "better-sqlite3";

const db = new Database('./data.sqlite');

// Crée la table si elle n'existe pas déjà
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`).run();

export default db