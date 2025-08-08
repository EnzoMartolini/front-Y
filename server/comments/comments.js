import db from '../db.js';

export function createComment(user_id, publication_id, content) {
  try {
    // Log pour déboguer les valeurs reçues
    console.log('Création commentaire avec:', { user_id, publication_id, content });

    // Vérification de la publication
    const publication = db.prepare('SELECT id FROM publication WHERE id = ?').get(publication_id);
    if (!publication) {
      throw new Error('Publication non trouvée');
    }

    // Vérification de l'utilisateur - Utiliser 'users' au lieu de 'user'
    const userExists = db.prepare('SELECT id FROM users WHERE id = ?').get(user_id);
    if (!userExists) {
      throw new Error('Utilisateur non trouvé');
    }

    // Insertion du commentaire
    const stmt = db.prepare(`
      INSERT INTO comments (user_id, publication_id, content, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `);

    const info = stmt.run(user_id, publication_id, content);
    
    // Récupération du commentaire avec username
    const newComment = db.prepare(`
      SELECT 
        c.*,
        u.username 
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.id = ?
    `).get(info.lastInsertRowid);

    console.log('Commentaire créé:', newComment);
    return newComment;
  } catch (error) {
    console.error('Erreur dans createComment:', error);
    throw error;
  }
}

export function getCommentsByPostId(publication_id) {
  try {
    const stmt = db.prepare(`
      SELECT 
        c.*,
        u.username 
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.publication_id = ?
      ORDER BY c.created_at DESC
    `);

    const comments = stmt.all(publication_id);
    return comments;
  } catch (error) {
    console.error('Erreur dans getCommentsByPostId:', error);
    throw error;
  }
}