import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import path from 'path';
import socket from 'socket.io';
import * as pythonUtils from './helpers/pythonUtils';
import * as movement from '../common/movementNames';

dotenv.config();

const app = express();
const server = http.Server(app);
const io = socket(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  console.log('A client is coming...');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Events set up after the connection
io.on('connection', (socket) => {
  console.log(`Client address : ${socket.request.connection.remoteAddress}`);

  socket.on(movement.MOVE_LEFT_ARM, (message) => pythonUtils.moveLeftArm(message));
  socket.on(movement.MOVE_RIGHT_ARM, (message) => pythonUtils.moveRightArm(message));
  socket.on(movement.MOVE_LEFT_HAND, (message) => pythonUtils.moveLeftHand(message));
  socket.on(movement.MOVE_RIGHT_HAND, (message) => pythonUtils.moveRightHand(message));
  socket.on(movement.MOVE_HEAD, (message) => pythonUtils.moveHead(message));
  socket.on(movement.LIGHT_EYES, (message) => pythonUtils.lightEyes(message));
  socket.on(movement.LIGHT_TORSO, (message) => pythonUtils.lightTorso(message));
});

server.listen(5000, () => {
  console.log(`Server listening on *:5000`);
});