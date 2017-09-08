import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import path from 'path';
import PythonShell from 'python-shell';
import * as _ from 'lodash';
import socket from 'socket.io';

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

  socket.on('moveleftarm', (message) => {
    console.log(message);
    launchPython('moveleftarm');
  });
  socket.on('moverighttarm', (message) => {
    console.log(message);
    launchPython('moverightarm');
  });
  socket.on('movelefthand', (message) => {
    console.log(message);
    launchPython('movelefthand');
  });
  socket.on('moverighthand', (message) => {
    console.log(message);
    launchPython('moverighthand');
  });
  socket.on('movehead', (message) => {
    console.log(message);
    launchPython('movehead');
  });
  socket.on('lighteyes', (message) => {
    console.log(message);
    launchPython('lighteyes');
  });
  socket.on('lighttorso', (message) => {
    console.log(message);
    launchPython('energy');
  });

});

// List of current movements
let moves = [];

/**
 * Executes Python script to achieve a preset movement
 * 
 * @param {String} name the name of the movement to achieve
 */
const launchPython = (name) => {
  if (!controlMove(name)) {
    return;
  }

  const options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    scriptPath: 'python/',
    args: ['value1', 'value2', 'value3']
  };

  console.log(`Movement ${name} start`);
  PythonShell.run(name + '.py', options, (err, results) => {
    if (err) throw err;
    console.log(`Movement ${name} end`);
    console.log('%j', results);
    _.pull(moves, name);
  });
}

/**
 * Checks if the movement is not already in progress.
 * 
 * A movement on the same member / body part cannot be achieved more than once simultaneously.
 * However, several movements on different body parts can be achieved simultaneously.
 * 
 * @param {String} move the name of the movement to control
 */
const controlMove = (move) => {
  if (_.find(moves, (o) => o === move)) {
    return false;
  } else {
    moves = _.concat(moves, move);
    return true;
  }
}

server.listen(5000, () => {
  console.log(`Server listening on *:5000`);
});
