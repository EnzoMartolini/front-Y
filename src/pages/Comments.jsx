import React, { useState, useEffect } from 'react';

export default function Comments({ publication_id, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!publication_id) return; // Sécurité : pas d'appel si ID absent

    fetch(`http://localhost:3000/comments/${publication_id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
        }
      })
      .catch(err => console.error('Erreur lors du chargement des commentaires :', err));
  }, [publication_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          publication_id,
          content: newComment
        })
      });

      if (res.ok) {
        const added = await res.json();
       setComments(prevComments => [...prevComments, added]);
        setNewComment('');
      } else {
        console.error('Erreur lors de l\'ajout du commentaire');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Commentaires</h4>

      {comments.length === 0 && <p>Aucun commentaire</p>}

     {comments.map(c => (
  <div key={c.id} style={{ padding: '0.5rem', borderBottom: '1px solid #555' }}>
    <strong>{c.username || `Utilisateur #${c.user_id}`}</strong> : {c.content}
    <div style={{ fontSize: '0.8rem', color: '#888' }}>
      {new Date(c.created_at).toLocaleString()}
    </div>
  </div>
))}

      {currentUser && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            style={{ width: '80%' }}
          />
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
}
