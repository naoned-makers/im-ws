import io from 'socket.io-client';

const socket = io.connect('http://' + location.host);

export const emitAction = (move, status) => socket.emit(move, status);