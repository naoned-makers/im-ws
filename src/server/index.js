import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import path from 'path';
import socket from 'socket.io';
import * as pythonUtils from './helpers/pythonUtils';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  console.log('A client is coming...');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Events set up after the connection
io.sockets.on('connection', (socket) => {
  console.log(`Client address : ${socket.request.connection.remoteAddress}`);

  socket.on('moveleftarm', (message) => pythonUtils.moveLeftArm(message));
  socket.on('moverighttarm', (message) => pythonUtils.moveRightArm(message));
  socket.on('movelefthand', (message) => pythonUtils.moveLeftHand(message));
  socket.on('moverighthand', (message) => pythonUtils.moveRightHand(message));
  socket.on('movehead', (message) => pythonUtils.moveHead(message));
  socket.on('lighteyes', (message) => pythonUtils.lightEyes(message));
  socket.on('lighttorso', (message) => pythonUtils.lightTorso(message));
});

server.listen(5000, () => {
  console.log(`Server listening on *:5000`);
});