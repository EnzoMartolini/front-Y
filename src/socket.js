// src/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const initSocket = (userId) => {
  socket = io('http://localhost:3000', {
    query: { userId }
  });

  return socket;
};

export const getSocket = () => socket;
