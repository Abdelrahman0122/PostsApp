import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

 const app = express();
 app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = new Server(server,{
    cors: "*"
});



const userSocketMap = {};

app.set('io', io);
io.on('connection', (socket) => {
    console.log('New client connected');

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;
      
    // Broadcast online users list to all clients
    io.emit('onlineUsers', Object.keys(userSocketMap));
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Remove user from online users set
      delete userSocketMap[userId];
      // Broadcast updated online users list
      io.emit('onlineUsers', Object.keys(userSocketMap));
    });
  });

export { app, server , io };
