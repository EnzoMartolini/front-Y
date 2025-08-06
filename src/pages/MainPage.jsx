import { Link } from 'react-router-dom';

function MainPage() {
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

  const publications = {
    'post1': {
      idUser: '2346354',
      name: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit',
      isLiked: true,
    },
    'post2': {
      idUser: '9832462',
      name: 'Marie Rose',
      content: 'Vivamus feugiat purus sit amet nisi sodales, non pulvinar leo volutpat.',
      isLiked: false,
    },
    'post3': {
      idUser: '1348390',
      name: 'Ni Am',
      content: 'Ce monde est fou... mais j’y crois encore.',
      isLiked: true,
    },
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
      scroll:'',
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
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'space-between',
    }
  };

  return (
    <div style={styles.page}>
      {/* Sidebar gauche */}
      <div style={{ ...styles.sidebar, ...styles.flexCol }}>
        <div>
          <h1 style={styles.logo}>Y</h1>
          <div style={{ ...styles.flexCol, ...styles.navLinks }}>
            <Link  to="/main"style={styles.green}>Accueil</Link>
            <Link to="/messenger" style={{color:'white'}}>Messagerie</Link>
            <Link to="/profil" style={{color:'white'}}>Mon profil</Link>
          </div>
        </div>
        <button style={styles.disconnectBtn}>Déconnexion</button>
      </div>

      {/* Centre */}
      <div style={{ ...styles.main, ...styles.flexCol }}>
        {/* Champ de publication */}
        <div style={{ ...styles.box, ...styles.flexCol, ...styles.gap1 }}>
          <p>Que veux-tu dire au <span style={styles.green}>monde</span> ?</p>
          <div style={styles.postFooter}>
            <span role="img" aria-label="image" style={styles.green}>🖼️</span>
            <button style={styles.sendBtn}>Envoyer</button>
          </div>
        </div>

        {/* Publications dynamiques */}
        {Object.entries(publications).map(([key, post]) => (
          <div key={key} style={{ ...styles.box, ...styles.flexCol, ...styles.gap08 }}>
            <strong>{post.name}</strong>
            <p>{post.content}</p>
            <div style={styles.postFooter}>
              <span style={styles.green}>Commentaires</span>
              <span role="img" aria-label="heart" style={styles.green}>
                {post.isLiked ? '💚' : '🤍'}
              </span>
            </div>
          </div>
        ))}
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
