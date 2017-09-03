
/**
    PARTIE WEBSOCKET

var socket = io.connect('http://' + location.host);

function doEmitSocket(move, status) {
    socket.emit(move, status);
}
*/


/**
    PARTIE MQTT sur WEBSOCKET
*/
var client = mqtt.connect('ws://localhost:3000',{clientId:'im-web'});//"ws" 'ws://localhost:3000',{clientId:'im-ihm-client'}

//Emitted on successful (re)connection 
client.on('connect', function () { 
    console.log('connect');
    document.getElementById("legosvg").getSVGDocument().getElementById("energy").querySelector("circle").setAttribute("fill", "white"); 
 })

//Emitted when the client goes offline.
 client.on('offline', function () { 
    console.log('offline');
    document.getElementById("legosvg").getSVGDocument().getElementById("energy").querySelector("circle").setAttribute("fill", "black"); 
 })
//Emitted after a disconnection.
 client.on('close', function () { 
    console.log('close');
    document.getElementById("legosvg").getSVGDocument().getElementById("energy").querySelector("circle").setAttribute("fill", "red"); 
 })
 //Emitted when a reconnect starts.
 client.on('reconnect', function () { 
    console.log('reconnect');
   document.getElementById("legosvg").getSVGDocument().getElementById("energy").querySelector("circle").setAttribute("fill", "orange"); 
})
//Emitted when the client cannot connect (i.e. connack rc != 0) or when a parsing error occurs.
 client.on('error', function () { 
    console.log('error');
    document.getElementById("legosvg").getSVGDocument().getElementById("energy").querySelector("circle").setAttribute("fill", "gray"); 
 })

function doEmitSocket(move, status) {
    let playload = {'move':move,'status':status}
    client.publish("topicLegacyMessage",JSON.stringify(playload),console.info);
}



