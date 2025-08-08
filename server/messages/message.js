import db from '../db.js';

export function getPrivateMessage(fromUserId, toUserId) {
  const stmt = db.prepare(`
    SELECT * FROM message 
    WHERE (fromUserId = ? AND toUserId = ?)
    OR (fromUserId = ? AND toUserId = ?)
    ORDER BY timestamp ASC ;
  `);

  const messages = stmt.all(fromUserId, toUserId, toUserId, fromUserId);

  return messages;
}

export function savePrivateMessage(fromUserId, toUserId, content, fromEmail) {
    const stmt = db.prepare(`
      INSERT INTO message (fromUserId, toUserId, content, email)
      VALUES (?, ?, ?, ?)
    `);
    
    const info = stmt.run(fromUserId, toUserId, content, fromEmail);
  
    // info.lastInsertRowid contient l’ID du message inséré
    return info.lastInsertRowid;
  }
