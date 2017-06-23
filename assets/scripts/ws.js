
    /**
        PARTIE WEBSOCKET
    */
    //console.log(location.host);
    //console.log("sdcsdc ", ipadress, " sdckjshd");
    var socket = io.connect('http://' + location.host);
    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    });
    /*document.getElementById('test').click(function () {
    console.log('sldjvsdlhvlhsdlv')

    })
    document.getElementById('poke').click(function () {
      console.log("coucou le monde")
        socket.emit('message', 'XXSalut serveur, ça va ?');
    });*/

    var canvas = document.getElementById("remote");
    canvas.addEventListener("touchstart", mouse_down);
    canvas.addEventListener("touchend", mouse_up);
    canvas.addEventListener("touchmove", mouse_move);
    canvas.addEventListener("mousedown", mouse_down);
    canvas.addEventListener("mouseup", mouse_up);
    canvas.addEventListener("mousemove", mouse_move);




    $('#poke').click(function () {
        socket.emit('message', 'Salut serveur, ça va ?');
    });
    $('#left_arm').click(function () {
        socket.emit('mouvement', 'Je lève le bras gauche...');
    });
    $('#right_arm').click(function () {
        socket.emit('mouvement', 'Je lève le bras droit...');
    });

    /*var pseudo = prompt('Quel est votre pseudo ?');
    socket.emit('petit_nouveau', pseudo);*/
function mouse_down()
{
    cpt = cpt - 1;
    console.log('mouse_down');
    socket.emit('cpt', cpt);
}
function mouse_up()
{
    cpt = cpt + 1;
    console.log('mouse_up');
    socket.emit('cpt', cpt);
}
function mouse_move()
{
    console.log('mouse_move');
    socket.emit('cpt', cpt);
}

