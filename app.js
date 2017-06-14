var fs = require('fs');
var spdy = require('spdy');

var bodyParser = require('body-parser');
var path = require('path');

var sseMW = require('./sse');
var ip = require("ip");

var express = require('express');
//self signed ssl ceritificate for hostname dbuntu
//ceate online by http://www.selfsignedcertificate.com/
var options = {
    key: fs.readFileSync('ssl.key'),
    cert: fs.readFileSync('ssl.cert')
};
var app = express();
//var http = require('http');
//var server = http.createServer(app);
var server = spdy.createServer(options, app);

app.use(express.static('assets'))

let cpt;
let move;

//configure sseMW.sseMiddleware as function to get a stab at incoming requests, in this case by adding a Connection property to the request
app.use(sseMW.sseMiddleware);
// Realtime updates
var sseClients = new sseMW.Topic();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res, next) {
    console.log('arrivé sur la page...');
    res.sendFile(path.join(__dirname + '/index.html'));
});

// initial registration of SSE Client Connection 
app.get('/sseupdates', function (req, res) {
    var sseConnection = res.sseConnection;
    sseConnection.setup();
    console.log('Vous êtes bien connecté !');
    sseConnection.send('Vous êtes bien connecté !');
    sseClients.add(sseConnection);
    //updateSseClients('Un autre client vient de se connecter !');
});

var m;
//send message to all registered SSE clients
updateSseClients = function (message) {
    var msg = message;
    this.m = message;
    sseClients.forEach(
        function (sseConnection) {
            sseConnection.send(this.m);
        }
        , this // this second argument to forEach is the thisArg (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 
    ); //forEach
}// updateSseClients

app.post('/xhrmessage', function (req, res) {
    var type = req.body.type;
    var message = req.body.message;
    if (type == 'message') {
        console.log('socket.pseudo' + ' me parle ! Il me dit : ' + message);
        updateSseClients('socket.pseudo' + ' me parle ! Il me dit : ' + message);
    } else if (type == 'mouvement') {
        console.log(message);
    } else if (type == 'mvtstop') {
        let data = JSON.parse(message);
        move = data.mvt;
        console.log("j'arrete de bouger " + move);
        cpt = data.cpt;
        if (data.direction == "up") {
            upgrade(move);
        } else {
            downgrade(move);
        }
    } else if (type == 'mvtstop') {
        let data = JSON.parse(message);
        move = data.mvt;
        //cpt = data.cpt;
        if (data.direction == "up") {
            upgrade(move);
        } else {
            downgrade(move);
        }
    }
    res.end();
});

let i = 1;

function upgrade(move) {
    console.log('move : ' + move);
    let interval = setInterval(increment, 1000);
}

function downgrade(move) {
    console.log('move : ' + move);
    //  let interval = setInterval( decrement, 1000);
}

function increment() {
    console.log('je suis dans increment');
    if (!move) {
        return;
    }
    i = i + 1;
    console.log('cpt : ' + i);
}

function decrement() {
    console.log('je suis dans decrement');
    if (!move) {
        return;
    }
    i = i - 1;
    console.log('cpt : ' + i);
}


console.dir(ip.address());
server.listen(8080);