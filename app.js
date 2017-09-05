let http = require('http');
let fs = require('fs');
let express = require('express');
let app = express();
let server = http.createServer(app);
let ip = require("ip");
let path = require('path');
let PythonShell = require('python-shell');
let _ = require('lodash');

//Domains Entity
let entities = require('./entities.js'); 

//#########################
//for serving html files
//#########################
app.use(express.static(__dirname + '/assets'));
app.get('/', function (req, res, next) {
    //console.log('arrivé sur la page...');
    res.sendFile(path.join(__dirname + '/index.html'));
});
server.listen(8080);
console.log('\x1b[35m%s\x1b[0m',"web server is up on "+ip.address()+":8080");



//#########################
//for POC we start everithing from one script
//  Broker MQTT (aka mosca nodejs module)
//  synapse script in python
//  im-brain (CQRS way)
//#########################
let mosca = require('mosca');
let mqtt = require('mqtt');
startLocalMqttBroker().then(function () {
    console.log('\x1b[35m%s\x1b[0m',"mqtt brocker is up");

    //#########################
    //start local actioner listener
    //#########################
    launchPython("synapse",'mock');


    //#########################
    //start local im-brain
    //#########################
    startLocalBrain();


    //#########################
    //start local to internet message gateway
    //#########################
    startInternetMessageRelay();
    

});

/**
 * Démare un broker mqtt sur le port standard 1883
 * Le broker gère aussi le mqtt sur websocket sur le port 3000
 * Le tous sans authentification, ni quelconque sécurité
 */
function startLocalMqttBroker() {
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
                port: 3000,         //activated mqtt on ws
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


/**
 * Start a command handler who listen to mqtt commande message topics
 * Logic based on CQRS E/S architecture
 * TODO refactor in reactiveJS way
 */
function startLocalBrain() {

    //une fois démaré, on se connecte au broker (localhost) et on suscribe aux command message
    var client = mqtt.connect('mqtt://localhost', { clientId: 'im-brain' })
    client.on('connect', function () {
        //commnad topics look like  im/command/<entity>/<command>
        client.subscribe('im/command/#')
    })
    //A new command as arrived
    client.on('message', function (topic, strPlayload) {
        //TODO add a try catch
        var entityCode = topic.split("/")[2];
        var entityCommand = topic.split("/")[3];
        console.log('\x1b[36m%s\x1b[0m',entityCode +"/"+ entityCommand +"->"+ strPlayload);
        var playLoad = JSON.parse(strPlayload);
        //call the matching entity domain
        if(entities[entityCode + 'Entity']){
            entities[entityCode + 'Entity'](client,entityCommand, playLoad);
        }else{
            console.log('\x1b[36m%s\x1b[0m',"Entity domain not found");    
        }
        
    })
}


/**
 * Start a internet gateway that synchronize one way between an internet firebase realtime database and local mqtt broker
 *      firebase path  <-->   mqtt topic url
 */
function startInternetMessageRelay(){
    //Connect to firebase realtimedatabase
    //  'im/event/#'
    //suscribe to mqtt event topics and update corresponding firebase event entry
    //  'im/command/#'
    //watch firebase command entry, and publish them as a mqtt one in the corresponding item
}

/**
 * Lance le script Python 
 * 
 * @param {String} name le nom du mouvement à effectuer 
 * @param {String} firstArg python script first arg
 */
function launchPython(name,firstArg="") {
    var options = {
        mode: 'text',
        pythonPath: '/usr/bin/python',
        pythonOptions: ['-u'],
        scriptPath: 'python/',
        args: [firstArg]
    };

    //console.log('launchPython', name);
    let pyshell = PythonShell.run(name + '.py', options, function (err, results) {
        if (err) throw err;
        console.log('end launchPython', name);
        //console.log('%j', results); we prefer live message that a final result
    });

    pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement) 
        console.log('\x1b[33m%s\x1b[0m',message);
    });

}