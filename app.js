let http = require('http');
let fs = require('fs');
let express = require('express');
let app = express();
let server = http.createServer(app);
let ip = require("ip");
let path = require('path');
let PythonShell = require('python-shell');
let _ = require('lodash');

console.log ( "le serveur est sur l'ip", ip.address() );

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res, next){
  console.log('arrivé sur la page...');
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// ajout des event quand la connexion a eu lieu
io.sockets.on('connection', function (socket) {
    console.log('adresse client ' + socket.request.connection.remoteAddress);
    socket.on('moveleftarm', function(message) {
        launchPython('moveleftarm');
    });
    socket.on('moverighttarm', function(message) {
        launchPython('moverightarm');
    });
    socket.on('movelefthand', function(message) {
        launchPython('movelefthand');
    });
    socket.on('moverightthand', function(message) {
        launchPython('moverighthand');
    });
    socket.on('movehead', function(message) {
        launchPython('movehead');
    });
    socket.on('lighteyes', function(message) {
        launchPython('lighteyes');
    });
    socket.on('lighttorso', function(message) {
        launchPython('lighttorso');
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
        pythonPath: '/usr/bin/python',
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
    if (_.find(moves, function(o) { return o === move; })) {
        return false;
    } else {
        moves = _.concat(moves, move);
        return true;
    }
}

server.listen(8080, ip.address());