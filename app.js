let http = require('http');
let fs = require('fs');
let express = require('express');
let app = express();
let server = http.createServer(app);
let ip = require("ip");
let path = require('path');
let PythonShell = require('python-shell');
let _ = require('lodash');

console.log("le serveur est sur l'ip", ip.address());

app.use(express.static(__dirname + '/assets'));

app.get('/', function (req, res, next) {
    console.log('arrivé sur la page...');
    res.sendFile(path.join(__dirname + '/index.html'));
});


let mosca = require('mosca');
let mqtt = require('mqtt');
//pour le poc tous en un on démarre donc le brocker mqtt ici
startMqttBroker().then(function () {

    //une fois démaré, on se connecte au broker (localhost) et on suscribe aux message
        var client = mqtt.connect('mqtt://localhost',{clientId:'im-ws'})
        client.on('connect', function () {
            client.subscribe('topicLegacyMessage')
        })
        //quelque chose de nouveau sur le seul topic souscrit aka 'topicLegacyMessage'
        client.on('message', function (topic, strPlayload) {
            let playLoad = JSON.parse(strPlayload);
            console.log('#/topicLegacyMessage ',playLoad);
            if(playLoad.move=='lighttorso'){
                launchPython('energy');
            }else{
                launchPython(playLoad.move);
            }
            //client.end()
        })
    }
);

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
    if (_.find(moves, function (o) { return o === move; })) {
        return false;
    } else {
        moves = _.concat(moves, move);
        return true;
    }
}

server.listen(8080, ip.address());


/**
 * Démare un broker mqtt sur le port standard 1883
 * Le broker gère aussi le mqtt sur websocket sur le port 3000
 * Le tous sans authentification, ni quelconque sécurité
 */
function startMqttBroker() {
    return new Promise((resolve, reject) => {

        var moscaSettings = {
            port: 1883,
            //backend: ascoltatore,
            //persistence: mosca.persistence.Memory,
            //persistence: {
            //  factory: mosca.persistence.Mongo,
            //  url: 'mongodb://localhost:27017/mqtt'
            //},
            //backend: pubsubsettings
            //secure : { 
            //  port: 8443,
            //  keyPath: SECURE_KEY,
            //  certPath: SECURE_CERT,
            //}
            http: {
                port: 3000,
                //bundle: true,     mqtt.js n'est pas servi par ce bias
                //static: './'
            }
        };

        var server = new mosca.Server(moscaSettings);
        server.on('ready', resolve);

        server.on('clientConnected', function (client) {
            console.log('client connected', client.id);
        });
        server.on('clientDisconnected', function (client) {
            console.log('clientDisconnected', client.id);
        });
        
        // fired when a message is received
        server.on('published', function (packet, client) {
            //console.log('Published', packet.topic + " " +packet.payload);
        });
    });

}