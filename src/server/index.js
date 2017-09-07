import dotenv from 'dotenv';

dotenv.config();

let http = require('http');
let fs = require('fs');
let express = require('express');
let app = express();
let server = http.createServer(app);
let path = require('path');
let PythonShell = require('python-shell');
let _ = require('lodash');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
  console.log('arrivé sur la page...');

  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// ajout des event quand la connexion a eu lieu
io.sockets.on('connection', function (socket) {
  console.log('adresse client ' + socket.request.connection.remoteAddress);

  socket.on('moveleftarm', function (message) {
    console.log(message);
    launchPython('moveleftarm');
  });
  socket.on('moverighttarm', function (message) {
    console.log(message);
    launchPython('moverightarm');
  });
  socket.on('movelefthand', function (message) {
    console.log(message);
    launchPython('movelefthand');
  });
  socket.on('moverighthand', function (message) {
    console.log(message);
    launchPython('moverighthand');
  });
  socket.on('movehead', function (message) {
    console.log(message);
    launchPython('movehead');
  });
  socket.on('lighteyes', function (message) {
    console.log(message);
    launchPython('lighteyes');
  });
  socket.on('lighttorso', function (message) {
    console.log(message);
    launchPython('energy');
  });

});

// La liste des mouvements en cours
let moves = [];

/**
 * Lance le script Python pour réaliser un mouvement prédéfini.
 * 
 * @param {String} name le nom du mouvement à effectuer 
 */
function launchPython(name) {
  if (!controlMove(name)) {
    return;
  }

  var options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    scriptPath: 'python/',
    args: ['value1', 'value2', 'value3']
  };

  console.log('début du mouvement', name);
  PythonShell.run(name + '.py', options, function (err, results) {
    if (err) throw err;
    console.log('fin du mouvement', name);
    console.log('%j', results);
    _.pull(moves, name);
  });
}

/**
 * Contrôle le mouvement pour ne pas l'exécuter deux alors
 * qu'un mouvement est en cours.
 * On utilise un tableau car deux mouvements sur des membres
 * différents est un cas d'usage normal.
 * 
 * @param {String} move le nom du mouvement 
 */
function controlMove(move) {
  if (_.find(moves, function (o) { return o === move; })) {
    return false;
  } else {
    moves = _.concat(moves, move);
    return true;
  }
}

server.listen(5000, () => {
  console.log(`Server listening on *:5000`);
});
