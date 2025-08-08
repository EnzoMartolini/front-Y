import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Comments from './Comments.jsx';

function MainPage() {
  const [publications, setPublications] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Vérification de l'utilisateur connecté
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('🔍 Utilisateur dans localStorage:', user); // DEBUG
    
    if (!user) {
      // Rediriger vers login si pas connecté
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    console.log('✅ Utilisateur connecté:', user); // DEBUG
  }, [navigate]);

  // Données statiques pour les contacts (tu peux les déplacer vers le backend plus tard)
  const contacts = {
    'John Doe': { idUser: '2346354', img: 'john.png' },
    'Marie Rose': { idUser: '9832462', img: 'marie.png' },
    'Ni Am': { idUser: '1348390', img: 'niam.png' },
    'Ross Towel': { idUser: '9923471', img: 'ross.png' },
  };

  const contactsRecommanded = {
    'Rim Until': { idUser: '200001', img: 'rim.png' },
    'Rick Morty': { idUser: '200002', img: 'rick.png' },
    'Han Ry': { idUser: '200003', img: 'han.png' },
  };

  // Récupération des publications au chargement
  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/publications');
      if (response.ok) {
        const data = await response.json();
        setPublications(data);
      } else {
        setError('Erreur lors du chargement des publications');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      alert("Le contenu ne peut pas être vide.");
      return;
    }

    if (!currentUser || !currentUser.id) {
      alert("Vous devez être connecté pour publier.");
      return;
    }

    console.log('📤 Envoi publication avec userId:', currentUser.id); // DEBUG

    try {
      const response = await fetch('http://localhost:3000/publication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userId: currentUser.id, // ID dynamique de l'utilisateur connecté
          content: newPostContent 
        })
      });

      if (response.ok) {
        const newPublication = await response.json();
        console.log('📥 Publication créée:', newPublication); // DEBUG
        
        // Recharger toutes les publications pour avoir les infos utilisateur
        await fetchPublications();
        setNewPostContent('');
      } else {
        alert("Erreur lors de la publication.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const styles = {
    addBtn: {
      color: '#1CD500',
      border: 'none',
      padding: '0.2rem 0.6rem',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    page: {
      display: 'flex',
      height: '90vh',
      width: '100vw',
      color: 'white',
      fontFamily: 'sans-serif',
    },
    flexCol: {
      display: 'flex',
      flexDirection: 'column',
    },
    sidebar: {
      flex: 1,
      width: '15%',
      padding: '2rem 1rem',
      justifyContent: 'space-between',
    },
    navLinks: {
      gap: '2rem',
      marginTop: '6rem',
      fontSize: '1.2rem',
    },
    main: {
        flex: 3,
        width: '55%',
        padding: '2rem',
        gap: '2rem',
        overflowY: 'auto',
        height: '85vh',    
    },
    rightbar: {
      flex: 1,
      width: '30%',
      padding: '2rem',
      gap: '2rem',
    },
    box: {
      backgroundColor: '#595959',
      borderRadius: '1rem',
      padding: '1rem',
    },
    gap1: {
      gap: '1rem',
    },
    gap08: {
      gap: '0.8rem',
    },
    search: {
      color:'black',
      backgroundColor: 'white',
      borderRadius: '1.5rem',
      padding: '0.5rem 1rem',
      border: 'none',
      outline: 'none',
      fontSize: '1rem',
    },
    logo: {
        fontSize: '6rem',
        color: 'white',
        textShadow: '4px 0px 0px #1CD500',
        margin: 0,
    },
    green: {
      color: '#1CD500',
    },
    disconnectBtn: {
      backgroundColor: '#1CD500',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.4rem 1rem',
      fontSize: '0.8rem',
      alignSelf: 'flex-start',
    },
    sendBtn: {
      backgroundColor: 'white',
      color:'black',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.4rem 1rem',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    textarea: {
      backgroundColor: '#404040',
      color: 'white',
      border: '1px solid #666',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      fontSize: '1rem',
      resize: 'vertical',
      minHeight: '60px',
      outline: 'none',
    },
    loadingError: {
      textAlign: 'center',
      padding: '2rem',
      fontSize: '1.1rem',
    },
    postMeta: {
      fontSize: '0.8rem',
      color: '#ccc',
      marginTop: '0.5rem',
    }
  };

  return (
    <div style={styles.page}>
      {/* Sidebar gauche */}
      <div style={{ ...styles.sidebar, ...styles.flexCol }}>
        <div>
          <h1 style={styles.logo}>Y</h1>
          <div style={{ ...styles.flexCol, ...styles.navLinks }}>
            <Link to="/main" style={styles.green}>Accueil</Link>
            <Link to="/messenger" style={{color:'white'}}>Messagerie</Link>
            <Link to="/profil" style={{color:'white'}}>Mon profil</Link>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.disconnectBtn}>Déconnexion</button>
      </div>

      {/* Centre */}
      <div style={{ ...styles.main, ...styles.flexCol }}>
        {/* Formulaire de publication */}
        <form onSubmit={handleSubmitPost} style={{ ...styles.box, ...styles.flexCol, ...styles.gap1 }}>
          <p>Que veux-tu dire au <span style={styles.green}>monde</span> ?</p>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Écrivez votre publication ici..."
            style={styles.textarea}
          />
          <div style={styles.postFooter}>
            <span role="img" aria-label="image" style={styles.green}>🖼️</span>
            <button type="submit" style={styles.sendBtn}>Envoyer</button>
          </div>
        </form>

        {/* Publications dynamiques depuis le backend */}
        {loading ? (
          <div style={styles.loadingError}>Chargement des publications...</div>
        ) : error ? (
          <div style={styles.loadingError}>❌ {error}</div>
        ) : publications.length === 0 ? (
          <div style={styles.loadingError}>Aucune publication pour le moment</div>
        ) : (
 publications.map((post) => (
  <div key={post.id} style={{ ...styles.box, ...styles.flexCol, ...styles.gap08 }}>
    <strong>{post.username || 'Utilisateur inconnu'}</strong>
    <p>{post.content}</p>
    <div style={styles.postMeta}>
      Publié le {formatDate(post.created_at)}
    </div>

    <div style={styles.postFooter}>
      <span style={styles.green}>Commentaires</span>
      <span role="img" aria-label="heart" style={styles.green}>
        🤍
      </span>
    </div>
  </div>
          ))
        )}
      </div>

      {/* Sidebar droite */}
      <div style={{ ...styles.rightbar, ...styles.flexCol }}>
        <input type="text" placeholder="🔍" style={styles.search} />

        <div>
          <p><strong>Contacts</strong></p>
          {Object.entries(contacts).map(([name, user]) => (
            <p key={user.idUser}>{name}</p>
          ))}
        </div>

        <div>
          <p><strong>Suggestions</strong></p>
          {Object.entries(contactsRecommanded).map(([name, user]) => (
            <div key={user.idUser} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span>{name}</span>
              <button style={styles.addBtn}>+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;