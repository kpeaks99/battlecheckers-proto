import React from 'react';
import socketio from 'socket.io-client';
//import {SOCKET_URL} from './config';

//so the user has the same socket connection when they go to different pages
export const socket = socketio.connect('http://localhost:3001');
export const SocketContext = React.createContext();

