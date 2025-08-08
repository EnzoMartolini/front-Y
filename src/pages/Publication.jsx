import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function PublicationPage() {
  const [content, setContent] = useState('');
  const [publications, setPublications] = useState([]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Le contenu ne peut pas être vide.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/publication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: '2346354', content }) // Simule un ID utilisateur
      });

      if (res.ok) {
        const newPublication = await res.json();
        setPublications([...publications, newPublication]);
        setContent('');
      } else {
        alert("Erreur lors de la publication.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Publications</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Écrivez votre publication ici..."
          rows="4"
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ backgroundColor: '#1CD500', color: 'white', padding: '0.5rem 1rem' }}>Publier</button>
      </form>
      <div>
        {publications.map((pub, index) => (
          <div key={index} style={{ marginTop: '1rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: '#333' }}>
            <p>{pub.content}</p>
            <small>Publié par {pub.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
}