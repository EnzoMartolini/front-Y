import React, { useState } from 'react';

function ProfilePage() {
  const [username, setUsername] = useState('Jean Dupont');
  const [email, setEmail] = useState('jean.dupont@example.com');
  const [editing, setEditing] = useState(false);

  const styles = {
    page: {
      display: 'flex',
      height: '90vh',
      width: '100vw',
      color: 'white',
      fontFamily: 'sans-serif',
    },
    sidebar: {
      flex: 1,
      width: '15%',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
     },
    logo: {
      fontSize: '6rem',
      color: 'white',
      textShadow: '4px 0px 0px #1CD500',
      margin: 0,
      cursor: 'default',
    },
    navLinks: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      marginTop: '6rem',
      fontSize: '1.2rem',
    },
    navLink: (isActive) => ({
      color: isActive ? '#1CD500' : 'white',
      textDecoration: 'none',
      cursor: 'pointer',
    }),
    disconnectBtn: {
      backgroundColor: '#1CD500',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.6rem 1rem',
      fontSize: '0.9rem',
      alignSelf: 'flex-start',
      cursor: 'pointer',
    },
    content: {
        flex: 4,
        padding: '3rem 4rem',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        justifyContent: 'center',   // centre verticalement
        alignItems: 'center',       // centre horizontalement
        textAlign: 'center',        // centre le texte dans les éléments
      },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1CD500',
      marginBottom: '1rem',
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    avatar: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '4rem',
      color: '#222',
      userSelect: 'none',
      backgroundColor:'white'
    },
    formGroup: {
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      horizontalAlign:'middle',
      flexDirection: 'column',
      marginBottom: '1.5rem',
      width: '300px',
    },
    label: {
      marginBottom: '0.5rem',
      fontWeight: '600',
    },
    input: {
      padding: '0.6rem 1rem',
      fontSize: '1rem',
      borderRadius: '0.6rem',
      border: 'none',
      outline: 'none',
      backgroundColor: '#444',
      color: 'white',
    },
    editBtn: {
      backgroundColor: '#1CD500',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.6rem 1.2rem',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      width: '150px',
      alignSelf: 'flex-start',
    },
  };

  return (
    <div style={styles.page}>
      {/* Sidebar identique à Messenger */}
      <div style={styles.sidebar}>
        <div>
          <h1 style={styles.logo}>Y</h1>
          <nav style={styles.navLinks}>
            <a href="/?main" style={styles.navLink(false)}>
              Accueil
            </a>
            <a href="/?messenger" style={styles.navLink(false)}>
              Messagerie
            </a>
            <a href="/?profil" style={styles.navLink(true)}>
              Mon profil
            </a>
          </nav>
        </div>
        <button style={styles.disconnectBtn}>Déconnexion</button>
      </div>

      {/* Contenu principal */}
      <div style={styles.content}>
        <h2 style={styles.header}>Mon profil</h2>

        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>
            {/* Ici on met les initiales si pas d’image */}
            {username
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Modifications enregistrées !');
            setEditing(false);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Pseudo
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              disabled={!editing}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={!editing}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
