let cpt = 0;
let upWay = true;

let MOVE_LEFT_ARM = "moveleftarm";
let MOVE_RIGHT_ARM = "moverighttarm";
let MOVE_LEFT_HAND = "movelefthand";
let MOVE_RIGHT_HAND = "moverightthand";
let MOVE_HEAD = "movehead";
let LIGHT_EYES = "lighteyes";
let LIGHT_TORSO = "lighttorso";

let move;

/**
    PARTIE TOUCH
*/
// Get a reference to our touch-sensitive element
var legosvg = document.getElementById("legosvg");

legosvg.addEventListener("load",function(){

    // Récupération des éléments du SVG
    var svgDoc = legosvg.contentDocument;
    // Récupération des items du lego
    var left_arm = svgDoc.getElementById("left_arm");
    var right_arm = svgDoc.getElementById("right_arm");
    var left_hand = svgDoc.getElementById("left_hand");
    var right_hand = svgDoc.getElementById("right_hand");
    var head = svgDoc.getElementById("head");

    // Ajout du comportement
    left_arm.addEventListener("touchstart", touchHandler, false);
    left_arm.addEventListener("touchend", touchHandler, false);
    left_arm.addEventListener("mouseup", leftArmEndHandler, false);
    left_arm.addEventListener("mousedown", leftArmStartHandler, false);

    right_arm.addEventListener("touchstart", touchHandler, false);
    right_arm.addEventListener("touchend", touchHandler, false);
    right_arm.addEventListener("mouseup", rightArmEndHandler, false);
    right_arm.addEventListener("mousedown", rightArmStartHandler, false);

    left_hand.addEventListener("touchstart", touchHandler, false);
    left_hand.addEventListener("touchend", touchHandler, false);
    left_hand.addEventListener("mouseup", leftHandEndHandler, false);
    left_hand.addEventListener("mousedown", leftHandStartHandler, false);

    right_hand.addEventListener("touchstart", touchHandler, false);
    right_hand.addEventListener("touchend", touchHandler, false);
    right_hand.addEventListener("mouseup", rightHandEndHandler, false);
    right_hand.addEventListener("mousedown", rightHandStartHandler, false);

    head.addEventListener("touchstart", touchHandler, false);
    head.addEventListener("touchend", touchHandler, false);
    head.addEventListener("mouseup", headEndHandler, false);
    head.addEventListener("mousedown", headStartHandler, false);
}, false);


function leftArmStartHandler(event) {
    console.log('je suis dans leftArmStartHandler');
    doEmitSocket(MOVE_LEFT_ARM, 'iron man lève le bras gauche');
}
function leftArmEndHandler(event) {
    console.log('je suis dans leftArmEndHandler');
    socket.emit('leftarmend', 'YYYYYOOOOOOOOOOOUUUHHHHHHHHHHHHHOOOOOOOOOUUUUU leftArmEndHandler');
}
function rightArmStartHandler(event) {
    console.log('je suis dans rightArmStartHandler');
    doEmitSocket(MOVE_RIGHT_ARM, 'iron man lève le bras droit');
}
function rightArmEndHandler(event) {
    console.log('je suis dans rightArmEndHandler');
    socket.emit('leftarmend', 'YYYYYOOOOOOOOOOOUUUHHHHHHHHHHHHHOOOOOOOOOUUUUU rightArmEndHandler');
}
function leftHandStartHandler(event) {
    console.log('je suis dans leftHandStartHandler');
    doEmitSocket(MOVE_LEFT_HAND, 'iron man tourne la main gauche');
}
function leftHandEndHandler(event) {
    console.log('je suis dans leftHandEndHandler');
    socket.emit('leftarmend', 'YYYYYOOOOOOOOOOOUUUHHHHHHHHHHHHHOOOOOOOOOUUUUU leftHandEndHandler');
}
function rightHandStartHandler(event) {
    console.log('je suis dans rightHandStartHandler');
    doEmitSocket(MOVE_RIGHT_HAND, 'iron man tourne la main droite');
}
function rightHandEndHandler(event) {
    console.log('je suis dans rightHandEndHandler');
    socket.emit('leftarmend', 'YYYYYOOOOOOOOOOOUUUHHHHHHHHHHHHHOOOOOOOOOUUUUU rightHandEndHandler');
}
function headStartHandler(event) {
    console.log('je suis dans headStartHandler');
    doEmitSocket(MOVE_HEAD, 'iron man tourne la tête');
}
function headEndHandler(event) {
    console.log('je suis dans headEndHandler');
    socket.emit('leftarmend', 'YYYYYOOOOOOOOOOOUUUHHHHHHHHHHHHHOOOOOOOOOUUUUU headEndHandler');
}

function doEmitSocket(move, status) {
        socket.emit(move, status);
        //coords.innerHTML = 'x: ' + coordX + ', y: ' + coordY + '<br/>status: ' + status + '<br/>cpt: ' + cpt;
        coords.innerHTML = 'status: ' + status;
}


function touchHandler(event) {
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;        
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                                  first.screenX, first.screenY, 
                                  first.clientX, first.clientY, false, 
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
/*var touchzone = document.getElementById("touchzone");
touchzone.addEventListener("touchstart", touchHandler, false);
touchzone.addEventListener("touchend", touchEndHandler, false);

touchzone.addEventListener("mousedown", touchHandler, false);
touchzone.addEventListener("mouseup", touchEndHandler, false);

function touchEndHandler(event) {
    console.log('je suis dans touchEndHandler');
    socket.emit('mvtstop', '{"cpt":1, "mvt": false}');
}

function touchHandler(event) {
    event.preventDefault();
    let doCall = false;
    if (event instanceof MouseEvent) {
        event.stopPropagation();
        return;
    }
    console.log(event);
    upWay = true;
    if (event.type =='mousedown') {
        console.log('je suis dans touchHandler sans touches');
    } else if (event.touches[1]) {
        upWay = false;
        console.log('je suis dans touchHandler avec touches 1');
    } else if (event.touches[0]) {
        console.log('je suis dans touchHandler avec touches 0');
    }
    
    // Get a reference to our coordinates div
    var coords = document.getElementById("coords");
    // Write the coordinates of the touch to the div
    let status = 'status: ';
    let coordX;
    let coordY;
    if (event.type == 'mousedown') {
        coordX = event.clientX;
        coordY = event.clientY;
    } else if (event.touches[1]) {
        coordX = event.touches[1].pageX;
        coordY = event.touches[1].pageY;
    } else {
        coordX = event.touches[0].pageX;
        coordY = event.touches[0].pageY;
    }

    if (coordX > 155 && coordX < 275 && coordY > 500 && coordY < 720) {
        doEmitSocket(MOVE_LEFT_ARM, coordX, coordY, 'iron man lève le bras gauche')
    }
    if (coordX > 500 && coordX < 630 && coordY > 520 && coordY < 740) {
        doEmitSocket(MOVE_RIGHT_ARM, coordX, coordY, 'iron man lève le bras droit')
    }
    if (coordX > 270 && coordX < 520 && coordY > 280 && coordY < 350) {
        doEmitSocket(LIGHT_EYES, coordX, coordY, 'iron man allume ses yeux')
    }
    if (coordX > 350 && coordX < 430 && coordY > 540 && coordY < 600) {
        doEmitSocket(LIGHT_TORSO, coordX, coordY, 'iron man allume son torse')
    }
}
*/

