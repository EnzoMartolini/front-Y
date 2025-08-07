import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocket } from '../socket';

function MessengerPage() {
  const [socket, setSocket] = useState(null);

  const [view, setView] = useState('groups'); // 'groups' ou 'contacts'
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeContact, setActiveContact] = useState(0);

  const [userId, setUserId] = useState(0)

  const [historyMessages, setHistoryMessages] = useState([])
  const [newMessage, setNewMessage] = useState('');
  const [contactMessages, setContactMessages] = useState({});

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


  // Récupérer les messages affichés selon la vue et l'élément actif
  const currentMessages =
  view === 'groups'
    ? groupMessages[groups[activeGroup].id] || []
    : contactMessages[contacts[activeContact]?.userId] || [];


  useEffect(() => {
    const s = getSocket();
    setSocket(s);

    const stored = localStorage.getItem('user')
    if (stored) {
      setUserId(JSON.parse(stored))
    }
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

    // Écouter la liste des utilisateurs connectés
    s.on('activeUsers', (users) => {
      console.log(users)
      // users = tableau d'utilisateurs connectés, ex : [{ id, name }]
      setContacts(users);
    });

    s.on('private-message', ({ from, content }) => {
      console.log(from, content)
      // from est le userId de l’émetteur
      setContactMessages(prev => ({
        ...prev,
        [from]: [
          ...(prev[from] || []),
          { sender: from, text: content }
        ]
      }));
    });

  // Demander la liste des utilisateurs connectés dès la connexion
  s.emit('getActiveUsers');

  console.log(contacts)
  if (contacts[activeContact]) {
    const userId = contacts[activeContact].userId;

    // Transformer les messages au bon format pour l'affichage
    const formatted = historyMessages.map(msg => ({
      sender: msg.fromUserId === userId ? userId : 'Me',
      text: msg.content
    }));

    setContactMessages(prev => ({
      ...prev,
      [userId]: formatted
    }));
  }

  return () => {
    s.off('private-message'); 
    s.off('message', handleIncomingMessage);
    s.off('activeUsers');
  };

  }, []);

  useEffect(() => {
    console.log('contacts mis à jour:', contacts);
  }, [contacts]);

  useEffect(() => {
    console.log(socket)
  }, [socket])

  useEffect(() => {

    const loadMessage = async () => {
      try {
        const url = `http://localhost:3000/message?fromUserId=${userId.id}&toUserId=${contacts[activeContact].userId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur réseau : ${response.status}`);
        }
        const data = await response.json();
        setHistoryMessages(data);
      } catch (error) {
        console.error("Erreur lors du chargement des messages :", error);
      }
    };
    

    loadMessage()

  }, [activeContact])

  useEffect(() => {
    if (contacts[activeContact]) {
      const userId = contacts[activeContact].userId;
  
      // Transformer les messages au bon format pour l'affichage
      const formatted = historyMessages.map(msg => ({
        sender: msg.fromUserId === userId ? userId : 'Me',
        text: msg.content
      }));
  
      setContactMessages(prev => ({
        ...prev,
        [userId]: formatted
      }));
    }
  }, [historyMessages, activeContact]);
  

  useEffect(() => {
    console.log(contactMessages)
  }, [contactMessages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const roomId = view === 'groups' ? groups[activeGroup].id : contacts[activeContact].userId;

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

    if (view === 'contacts' && socket) {
      console.log(contacts[activeContact])
      const to = contacts[activeContact].userId;
      socket.emit('private-message', {
        to: String(to),
        content: newMessage.trim()
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
                <strong>
                  { msg.sender === 'Me'
                      ? 'Me'
                      : contacts.find(c => String(c.userId) === msg.sender)?.email || msg.sender
                  }
                </strong>
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
