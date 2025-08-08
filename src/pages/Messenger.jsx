import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSocket } from '../socket';

function MessengerPage() {
  // États principaux
  const [socket, setSocket] = useState(null);
  const [activeContact, setActiveContact] = useState(0);
  const [userId, setUserId] = useState(null);
  
  // États des messages
  const [historyMessages, setHistoryMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contactMessages, setContactMessages] = useState({});
  const [contacts, setContacts] = useState([]);

  // Messages actuels à afficher
  const currentMessages = contactMessages[contacts[activeContact]?.userId] || [];

  // Initialisation de la socket et récupération des données utilisateur
  useEffect(() => {
    const socket = getSocket();
    setSocket(socket);

    // Récupération des données utilisateur
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Utilisateur connecté:', storedUser);
      setUserId(JSON.parse(storedUser));
    }

    // Écouter la liste des utilisateurs connectés
    socket.on('activeUsers', (users) => {
      console.log('Utilisateurs actifs:', users);
      setContacts(users);
    });

    // Écouter les messages privés entrants
    socket.on('private-message', ({ from, content, fromEmail }) => {
      console.log('Message reçu:', { from, content, fromEmail });
      console.log('fromEmail type:', typeof fromEmail);
      console.log('fromEmail value:', fromEmail);
      
      setContactMessages(prev => ({
        ...prev,
        [from]: [
          ...(prev[from] || []),
          { 
            sender: from, 
            text: content,
            email: fromEmail
          }
        ]
      }));
    });

    // Demander la liste des utilisateurs connectés
    socket.emit('getActiveUsers');

    // Nettoyage des listeners
    return () => {
      socket.off('private-message');
      socket.off('activeUsers');
    };
  }, []);

  // Debug des contacts
  useEffect(() => {
    console.log('Contacts mis à jour:', contacts);
  }, [contacts]);

  // Chargement de l'historique des messages quand on change de contact
  useEffect(() => {
    if (!userId?.id || !contacts[activeContact]?.userId) return;

    const loadMessages = async () => {
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

    loadMessages();
  }, [activeContact, userId, contacts]);

  // Formatage des messages historiques pour l'affichage
  useEffect(() => {
    if (!contacts[activeContact] || !historyMessages.length) return;

    const contactUserId = contacts[activeContact].userId;
    console.log("Historique des messages:", historyMessages);

    const formattedMessages = historyMessages.map(msg => ({
      sender: msg.fromUserId === contactUserId ? contactUserId : 'Me',
      text: msg.content,
      email: msg.email
    }));

    setContactMessages(prev => ({
      ...prev,
      [contactUserId]: formattedMessages
    }));
  }, [historyMessages, activeContact, contacts]);

  // Debug des messages de contact
  useEffect(() => {
    console.log('Messages de contact:', contactMessages);
  }, [contactMessages]);

  // Envoi d'un nouveau message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket || !contacts[activeContact]) return;

    const contactUserId = contacts[activeContact].userId;
    const message = { sender: 'Me', text: newMessage.trim() };

    // Ajout local du message
    setContactMessages(prev => ({
      ...prev,
      [contactUserId]: [...(prev[contactUserId] || []), message]
    }));

    // Envoi via socket
    console.log('Contact actuel:', contacts[activeContact]);
    console.log('Données utilisateur:', userId);
    
    socket.emit('private-message', {
      to: String(contactUserId),
      content: newMessage.trim(),
      fromEmail: userId.email
    });

    setNewMessage('');
  };

  // Styles
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
    chatBox: {
      flex: 3,
      backgroundColor: '#595959',
      borderRadius: '1rem',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
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
    contactsList: {
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
    contactBtn: (isActive) => ({
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
                  {msg.sender === 'Me' ? 'Me' : msg.email || msg.sender}
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
            <button style={styles.sendBtn} onClick={handleSendMessage}>
              Envoyer
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div style={styles.contactsList}>
          <h2>Contacts</h2>
          
          <div style={styles.listContainer}>
            {contacts.map((contact, index) => (
              <button
                key={contact.userId}
                style={styles.contactBtn(activeContact === index)}
                onClick={() => setActiveContact(index)}
              >
                {contact.email}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessengerPage;