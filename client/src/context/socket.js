import React from 'react';
import socketio from 'socket.io-client';
//import {SOCKET_URL} from './config';

//so the user has the same socket connection when they go to different pages
export const socket = socketio.connect('http://localhost:3001');
export const SocketContext = React.createContext();

//this sends the clients its randomID to the server
//it's to help reconnect the the boardgame
socket.emit('register', localStorage.getItem('gameUniqueId'));


