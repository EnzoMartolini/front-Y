import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocket } from '../socket';

function MessengerPage() {
  const [socket, setSocket] = useState(null);

  const [view, setView] = useState('groups'); // 'groups' ou 'contacts'
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeContact, setActiveContact] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);

  const groups = [
    { id: 'g1', name: 'Group 1' },
    { id: 'g2', name: 'Group 2' },
    { id: 'g3', name: 'Group 3' },
    { id: 'g4', name: 'Group 4' },
  ];



  // Messages par ID (et non plus par nom)
  const [groupMessages, setGroupMessages] = useState({
    g1: [{ sender: 'Marie Rose', text: 'Bienvenue dans Group 1 !' }],
    g2: [{ sender: 'Bob', text: 'Hello Group 2 !' }],
    g3: [{ sender: 'Alice', text: 'Group 3 est actif.' }],
    g4: [{ sender: 'Charlie', text: 'Ceci est Group 4.' }],
  });

  const [contactMessages, setContactMessages] = useState({
    u1: [{ sender: 'Alice', text: 'Salut !' }, { sender: 'Me', text: 'Hey Alice !' }],
    u2: [{ sender: 'Bob', text: 'Yo' }, { sender: 'Me', text: 'Quoi de neuf ?' }],
    u3: [{ sender: 'Charlie', text: 'Bonjour' }],
    u4: [{ sender: 'Me', text: 'Salut David !' }],
  });

  // Récupérer les messages affichés selon la vue et l'élément actif
  const currentMessages =
  view === 'groups'
    ? groupMessages[groups[activeGroup].id] || []
    : contactMessages[contacts[activeContact]?.id] || [];


  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    // Écoute des messages entrants
    const handleIncomingMessage = (message) => {
      // message attendu = { roomId: string, sender: string, text: string, type: 'group' | 'contact' }
      if (!message || !message.roomId) return;

      if (message.type === 'group') {
        setGroupMessages((prev) => ({
          ...prev,
          [message.roomId]: [...(prev[message.roomId] || []), { sender: message.sender, text: message.text }],
        }));
      } else if (message.type === 'contact') {
        setContactMessages((prev) => ({
          ...prev,
          [message.roomId]: [...(prev[message.roomId] || []), { sender: message.sender, text: message.text }],
        }));
      }
    };


    s.on('message', handleIncomingMessage);

    // Écouter la liste des utilisateurs connectés
    s.on('activeUsers', (users) => {
      console.log(users)
      // users = tableau d'utilisateurs connectés, ex : [{ id, name }]
      setContacts(users);
    });

  // Demander la liste des utilisateurs connectés dès la connexion
  s.emit('getActiveUsers');

  return () => {
    s.off('message', handleIncomingMessage);
    s.off('activeUsers');
  };

  }, []);

  useEffect(() => {
    console.log('contacts mis à jour:', contacts);
  }, [contacts]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const roomId = view === 'groups' ? groups[activeGroup].id : contacts[activeContact].id;

    const message = { sender: 'Me', text: newMessage.trim() };

    // Ajout local
    if (view === 'groups') {
      setGroupMessages((prev) => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), message],
      }));
    } else {
      setContactMessages((prev) => ({
        ...prev,
        [roomId]: [...(prev[roomId] || []), message],
      }));
    }

    // Envoi socket au serveur (adapter selon protocole serveur)
    if (socket) {
      socket.emit('message', {
        roomId,
        sender: 'Me',
        text: newMessage.trim(),
        type: view === 'groups' ? 'group' : 'contact',
      });
    }

    setNewMessage('');
  };

  // Styles inchangés (copier-coller ou extraire dans un fichier séparé)
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
      filter: isActive
        ? 'brightness(1) saturate(3) drop-shadow(0 0 3px #1CD500)'
        : 'none',
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

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, ...styles.flexCol }}>
        <div>
          <h1 style={styles.logo}>Y</h1>
          <div style={{ ...styles.flexCol, ...styles.navLinks }}>
            <Link to="/main" style={{ color: 'white' }}>Accueil</Link>
            <Link to="/messenger" style={styles.green}>Messagerie</Link>
            <Link to="/profil" style={{ color: 'white' }}>Mon profil</Link>
          </div>
        </div>
        <button style={styles.disconnectBtn}>Déconnexion</button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Chat Box */}
        <div style={styles.chatBox}>
          <div style={styles.messages}>
            {currentMessages.map((msg, index) => (
              <div key={index}>
                <strong style={styles.messageSender(msg.sender === 'Me')}>{msg.sender}</strong>
                <p style={{ margin: 0 }}>{msg.text}</p>
              </div>
            ))}
          </div>
          <div style={styles.inputZone}>
            <span role="img" aria-label="image" style={styles.green}>🖼️</span>
            <input
              style={styles.input}
              placeholder="Dites quelque chose ..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button style={styles.sendBtn} onClick={handleSendMessage}>Envoyer</button>
          </div>
        </div>

        {/* Groups / Contacts List */}
        <div style={styles.groups}>
          <h2>{view === 'groups' ? 'Messagerie de groupe' : 'Contacts'}</h2>
          <div style={styles.listContainer}>
            {(view === 'groups' ? groups : contacts).map((item, i) => (
              <button
                key={item.id}
                style={styles.groupBtn(
                  (view === 'groups' ? activeGroup : activeContact) === i
                )}
                onClick={() => {
                  if (view === 'groups') setActiveGroup(i);
                  else setActiveContact(i);
                }}
              >
                {view === 'groups' ? item.name : item.email}
              </button>
            ))}
          </div>
          <div style={styles.iconBtnsContainer}>
            <button
              style={styles.iconBtn(view === 'groups')}
              onClick={() => setView('groups')}
              aria-label="Afficher groupes"
            >
              <img
                style={styles.iconImg}
                src="/src/assets/icons/group.svg"
                alt="group"
              />
            </button>
            <button
              style={styles.iconBtn(view === 'contacts')}
              onClick={() => setView('contacts')}
              aria-label="Afficher contacts"
            >
              <img
                style={styles.iconImg}
                src="/src/assets/icons/user.svg"
                alt="user"
              />
            </button>
          </div>
          <button style={styles.actionBtn}>Nouvelle discussion</button>
        </div>
      </div>
    </div>
  );
}

export default MessengerPage;
