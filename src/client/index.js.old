import './styles/styles.css';
import io from 'socket.io-client';
import * as movement from '../common/movementNames';

const socket = io.connect('http://' + location.host);

let cpt = 0;
let upWay = true;
let move;

/**
    PARTIE TOUCH
*/
// Get a reference to our touch-sensitive element
var legosvg = document.getElementById("legosvg");

legosvg.addEventListener("load", function () {

    // Récupération des éléments du SVG
    var svgDoc = legosvg.contentDocument;
    // Récupération des items du lego
    var left_arm = svgDoc.getElementById("left_arm");
    var right_arm = svgDoc.getElementById("right_arm");
    var left_hand = svgDoc.getElementById("left_hand");
    var right_hand = svgDoc.getElementById("right_hand");
    var head = svgDoc.getElementById("head");
    var energy = svgDoc.getElementById("energy");

    // Ajout du comportement
    left_arm.addEventListener("mousedown", leftArmStartHandler, false);

    right_arm.addEventListener("mousedown", rightArmStartHandler, false);

    left_hand.addEventListener("mousedown", leftHandStartHandler, false);

    right_hand.addEventListener("mousedown", rightHandStartHandler, false);

    head.addEventListener("mousedown", headStartHandler, false);

    energy.addEventListener("mousedown", energyStartHandler, false);
}, false);


function leftArmStartHandler(event) {
    console.log('je suis dans leftArmStartHandler');
    doEmitSocket(movement.MOVE_LEFT_ARM, 'iron man lève le bras gauche');
}

function rightArmStartHandler(event) {
    console.log('je suis dans rightArmStartHandler');
    doEmitSocket(movement.MOVE_RIGHT_ARM, 'iron man lève le bras droit');
}

function leftHandStartHandler(event) {
    console.log('je suis dans leftHandStartHandler');
    doEmitSocket(movement.MOVE_LEFT_HAND, 'iron man tourne la main gauche');
}

function rightHandStartHandler(event) {
    console.log('je suis dans rightHandStartHandler');
    doEmitSocket(movement.MOVE_RIGHT_HAND, 'iron man tourne la main droite');
}

function headStartHandler(event) {
    console.log('je suis dans headStartHandler');
    doEmitSocket(movement.MOVE_HEAD, 'iron man tourne la tête');
}

function energyStartHandler(event) {
    console.log('je suis dans energyStartHandler');
    socket.emit(movement.LIGHT_TORSO, 'iron man allume les LED de son torse');
}

function doEmitSocket(move, status) {
    socket.emit(move, status);
}