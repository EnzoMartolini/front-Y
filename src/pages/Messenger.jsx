import React, { useState } from 'react';

function MessengerPage() {
  const [view, setView] = useState('groups'); // 'groups' ou 'contacts'
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeContact, setActiveContact] = useState(null);

  const styles = {
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
      cursor: 'pointer',
    },
    content: {
      flex: 4,
      display: 'flex',
      padding: '2rem',
      gap: '2rem',
    },
    groups: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBottom: '1rem',
     },
    listContainer: {
      flex: 1,
      overflowY: 'auto',
      marginBottom: '1rem',
    },
    groupBtn: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      color: isActive ? '#1CD500' : 'white',
      fontWeight: isActive ? 'bold' : 'normal',
      fontSize: '1.1rem',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'left',
      padding: '0.4rem 0.6rem',
      borderRadius: '0.5rem',
      transition: 'background-color 0.3s',
    }),
    chatBox: {
      flex: 3,
      backgroundColor: '#595959',
      borderRadius: '1rem',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    iconBtnsContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '0.5rem',
      justifyContent: 'center',
    },
    iconBtn: (isActive) => ({
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      width: '2.5rem',
      height: '2.5rem',
      filter: isActive ? 'brightness(1) saturate(3) drop-shadow(0 0 3px #1CD500)' : 'none',
      transition: 'filter 0.3s',
    }),
    iconImg: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      userSelect: 'none',
      pointerEvents: 'none',
    },
    actionBtn: {
      backgroundColor: '#1CD500',
      color: 'white',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.6rem 1.2rem',
      fontSize: '1rem',
      cursor: 'pointer',
      alignSelf: 'center',
      width: '90%',
    },
    messageSender: (isMe) => ({
      color: isMe ? '#1CD500' : 'white',
      fontWeight: isMe ? 'bold' : 'normal',
    }),
    messages: {
      overflowY: 'auto',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem 0',
    },
    inputZone: {
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid white',
      paddingTop: '1rem',
      gap: '1rem',
    },
    input: {
      flex: 1,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'white',
      fontSize: '1rem',
    },
    sendBtn: {
      backgroundColor: 'white',
      color: 'black',
      border: 'none',
      borderRadius: '1rem',
      padding: '0.4rem 1rem',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };

  const groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];
  const contacts = ['Alice', 'Bob', 'Charlie', 'David'];

  const messages = [
    {
      sender: 'Marie Rose',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula ex eu augue dignissim, in imperdiet lacus convallis. Curabitur blandit convallis mi, at faucibus urna.`,
    },
    {
      sender: 'John Doe',
      text: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.`,
    },
    {
      sender: 'Me',
      text: `NzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzzemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. zaekjhjdszzzzz`,
    },
  ];

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, ...styles.flexCol }}>
        <div>
          <h1 style={styles.logo}>Y</h1>
          <div style={{ ...styles.flexCol, ...styles.navLinks }}>
            <a href="/?main" style={{ color: 'white' }}>
              Accueil
            </a>
            <a href="/?messenger" style={styles.green}>
              Messagerie
            </a>
            <a href="/?profil" style={{ color: 'white' }}>
              Mon profil
            </a>
          </div>
        </div>
        <button style={styles.disconnectBtn}>Déconnexion</button>
      </div>

      {/* Contenu principal : chatBox à gauche, groupes/contacts à droite */}
      <div style={styles.content}>
        {/* Zone de discussion à gauche */}
        <div style={styles.chatBox}>
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i}>
                <strong style={styles.messageSender(msg.sender === 'Me')}>
                  {msg.sender}
                </strong>
                <p style={{ margin: 0 }}>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Zone d’envoi */}
          <div style={styles.inputZone}>
            <span role="img" aria-label="image" style={styles.green}>
              🖼️
            </span>
            <input style={styles.input} placeholder="Dites quelque chose ..." />
            <button style={styles.sendBtn}>Envoyer</button>
          </div>
        </div>

        {/* Colonne groupes/contacts à droite */}
        <div style={styles.groups}>
          <h2>{view === 'groups' ? 'Messagerie de groupe' : 'Contacts'}</h2>

          <div style={styles.listContainer}>
            {(view === 'groups' ? groups : contacts).map((item, i) => (
              <button
                key={i}
                style={styles.groupBtn(
                  view === 'groups'
                    ? i === activeGroup
                    : i === activeContact
                )}
                onClick={() =>
                  view === 'groups'
                    ? setActiveGroup(i)
                    : setActiveContact(i)
                }
              >
                {view === 'groups' && (
                  <img
                    src={
                      i === activeGroup
                        ? '/src/images/silhouette-dutilisateurs-multiples-verte.png'
                        : '/src/images/silhouette-dutilisateurs-multiples.png'
                    }
                    alt="Groupe"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                )}
                {view === 'contacts' && (
                  <img
                    src="/src/images/utilisateur.png"
                    alt="Contact"
                    style={{ width: '1.5rem', height: '1.5rem' }}
                  />
                )}
                {item}
              </button>
            ))}
          </div>

          {/* Boutons images juste au-dessus du bouton en bas */}
          <div style={styles.iconBtnsContainer}>
            <button
              onClick={() => setView('groups')}
              style={styles.iconBtn(view === 'groups')}
              title="Groupes"
            >
              <img
                src="/src/images/silhouette-dutilisateurs-multiples.png"
                alt="Groupes"
                style={styles.iconImg}
              />
            </button>
            <button
              onClick={() => setView('contacts')}
              style={styles.iconBtn(view === 'contacts')}
              title="Contacts"
            >
              <img
                src="/src/images/utilisateur.png"
                alt="Contacts"
                style={styles.iconImg}
              />
            </button>
          </div>

          {/* Bouton + */}
          <button style={styles.actionBtn}>+</button>
        </div>
      </div>
    </div>
  );
}

export default MessengerPage;
