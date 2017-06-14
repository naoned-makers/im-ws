var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var ip = require("ip");
console.dir ( ip.address() );
var path = require('path');
var ios = require('socket.io-express-session');

/*var Session = require('express-session');
var SessionStore = require('session-file-store')(Session);
var session = Session({store: new SessionStore({path: __dirname+'/tmp/sessions'}), secret: 'pass', resave: true, saveUninitialized: true});


app.use(session);
*/

app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res, next){
  console.log('arrivé sur la page...');
  res.sendFile(path.join(__dirname + '/index.html'));
});

let cpt;
// Chargement de socket.io
var io = require('socket.io').listen(server);
//io.use(ios(session));
let move;
// ajout des event quand la connexion a eu lieu
io.sockets.on('connection', function (socket) {
    console.log('adresse client ' + socket.request.connection.remoteAddress);

    //socket.emit('message', 'Vous êtes bien connecté !');

	//socket.broadcast.emit('message', 'Un autre client vient de se connecter !');

	// Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    });	
	/*socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo;
	});*/
	socket.on('mouvement', function(message) {
        console.log(message);
	});
    socket.on('mvtstop', function(message) {
        let data = JSON.parse(message);
        move = data.mvt;
        console.log("j'arrete de bouger " + move);
        cpt = data.cpt;
        if (data.direction == "up") {
            upgrade(move);
        } else {
            downgrade(move);
        }
    });

    socket.on('mvtstart', function(message) {
        let data = JSON.parse(message);
        move = data.mvt;
        //cpt = data.cpt;
        if (data.direction == "up") {
            upgrade(move);
        } else {
            downgrade(move);
        }
	});
});

let i = 1;

function upgrade(move) {
  console.log('move : ' + move);
  let interval = setInterval( increment, 1000);
}

function downgrade(move) {
  console.log('move : ' + move);
//  let interval = setInterval( decrement, 1000);
}

function increment(){
    console.log('je suis dans increment');
    if (!move) {
        return;
    }
    i = i + 1;
    console.log('cpt : ' + i);
}

function decrement(){
    console.log('je suis dans decrement');
    if (!move) {
        return;
    }
    i = i - 1;
    console.log('cpt : ' + i);
}

server.listen(8080);