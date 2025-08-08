import db from '../db.js';

export function createPost(userId, content) { 
  const stmt = db.prepare(`
    INSERT INTO publication (id_user, content, created_at)
    VALUES (?, ?, datetime('now'))
  `);
  
  const info = stmt.run(userId, content);
  
  // Récupérer la publication créée avec les infos utilisateur
  const getPostStmt = db.prepare(`
    SELECT p.*, u.username, u.email
    FROM publication p
    LEFT JOIN users u ON p.id_user = u.id
    WHERE p.id = ?
  `);
  
  const newPost = getPostStmt.get(info.lastInsertRowid);
  return newPost;
}

export function getAllPosts() {
  try {
    console.log('Récupération des publications...');
    
    // Jointure avec created_at (correct maintenant)
    const stmt = db.prepare(`
      SELECT p.*, u.username, u.email
      FROM publication p
      LEFT JOIN users u ON p.id_user = u.id
      ORDER BY p.created_at DESC
    `);
    const posts = stmt.all();
    
    console.log('Publications trouvées:', posts.length);
    return posts;
    
  } catch (error) {
    console.error('Erreur dans getAllPosts:', error);
    throw error;
  }
}

export function getPostsByUserId(userId) {
  const stmt = db.prepare(`
    SELECT p.*, u.username, u.email
    FROM publication p
    LEFT JOIN users u ON p.id_user = u.id
    WHERE p.id_user = ?
    ORDER BY p.created_at DESC
  `);
  const posts = stmt.all(userId);
  return posts;
}