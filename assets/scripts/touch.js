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
var touchzone = document.getElementById("touchzone");
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

function doEmitSocket(move, coordX, coordY, status) {
        socket.emit(move, '{"mvt": true}');
        coords.innerHTML = 'x: ' + coordX + ', y: ' + coordY + '<br/>status: ' + status + '<br/>cpt: ' + cpt;
}
