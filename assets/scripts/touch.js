
//Usage intensif de la lib
//https://zingchart.github.io/zingtouch/#getting-started

var zt = new ZingTouch.Region(document.body);
var ironManContainer = document.getElementById('ironManContainer');
var head = document.getElementById('head');
var body = document.getElementById('body');
var armleft = document.getElementById('armleft');
var armright = document.getElementById('armright');
var legleft = document.getElementById('legleft');
var legright = document.getElementById('legright');

var coords = document.getElementById('coords');

zt.bind(body, 'tap', function(e){
	//Actions here
     coords.innerHTML = 'status: iron man allume son torse';  
     //socket.emit('mvtstart', '{"mvt": true, "direction": "' + direction + '"}');
}, false);
zt.bind(head, 'tap', function(e){
	//Actions here
     coords.innerHTML = 'status: iron man allume ses yeux';  
     //socket.emit('mvtstart', '{"mvt": true, "direction": "' + direction + '"}');
}, false);

var CustomPan = new ZingTouch.Pan();
var endPan = CustomPan.end;
CustomPan.end = function(inputs) {
    coords.innerHTML = 'status: iron man stop sa tête';;
    return endPan.call(this, inputs);
}


zt.bind(head,CustomPan, function(e){
    if (e.detail.data[0].directionFromOrigin<90 || e.detail.data[0].directionFromOrigin>270){
     coords.innerHTML = 'status: iron man bouge sa tête à droite';
    }else{
     coords.innerHTML = 'status: iron man bouge sa tête gauche';
    }
     //socket.emit('mvtstart', '{"mvt": true, "direction": "' + direction + '"}');
}, false);

zt.bind(armleft, 'pan', function(e){
    if (e.detail.data[0].directionFromOrigin<180){
     coords.innerHTML = 'status: iron man lève le bras gauche';
    }else{
     coords.innerHTML = 'status: iron man baisse le bras gauche';
    }

}, false);
zt.bind(armright, 'pan', function(e){
    if (e.detail.data[0].directionFromOrigin<180){
     coords.innerHTML = 'status: iron man lève le bras droit';
    }else{
     coords.innerHTML = 'status: iron man baisse le bras droit';
    }
}, false);