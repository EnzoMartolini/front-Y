import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; // <-- ICI, le bon import serveur
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';

const app = express();
app.use(cors());
app.use(express.json());

// Tes routes HTTP
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = registerUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  try {
    const user = loginUser(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Crée le serveur HTTP
const server = http.createServer(app);

// Initialise Socket.IO avec le serveur HTTP
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // ou l'adresse de ton front
    methods: ['GET', 'POST']
  }
});

const activeUsers = [];
io.on('connection', (socket) => {

  const userId = socket.handshake.query.userId;
  console.log(`🔌 User connecté avec ID : ${userId}`);

  // Chaque utilisateur rejoint une room à son ID pour messages privés directs
  socket.join(userId);

  socket.on('registerUser', ({ userId, email }) => {
    activeUsers.push({ socketId: socket.id, userId, email });
    io.emit('activeUsers', activeUsers);
  });
  

  socket.on('getActiveUsers', () => {
    socket.emit('activeUsers', activeUsers); // juste pour l'utilisateur courant
  });

  // Écoute message générique
  socket.on('message', ({ roomId, sender, text, type }) => {
    console.log(`📨 Message reçu dans room ${roomId} (${type}) de ${sender} : ${text}`);

    // S'assurer que l'envoyeur est bien dans la room (optionnel mais recommandé)
    if (!roomId) return;

    // Diffuse le message à tous dans la room (y compris l'envoyeur)
    io.to(roomId).emit('message', { roomId, sender, text, type });
  });

  // Ancien événement de message privé si besoin de compatibilité
  socket.on('private-message', ({ to, content }) => {
    console.log(`📨 Message privé de ${userId} à ${to} : ${content}`);
    io.to(to).emit('private-message', {
      from: userId,
      content,
    });
  });

  socket.on('disconnect', () => {
    // retirer de activeUsers l’entrée dont socket.id correspond
    const idx = activeUsers.findIndex(u => u.socketId === socket.id);
    if (idx !== -1) {
      activeUsers.splice(idx, 1);
      // informer tous les clients de la mise à jour
      io.emit('activeUsers', activeUsers);
    }
    console.log("User deconnecté")
  });
});


// Lance le serveur HTTP + WebSocket
server.listen(3000, () => {
  console.log('🚀 Serveur HTTP + WebSocket lancé sur http://localhost:3000');
});
