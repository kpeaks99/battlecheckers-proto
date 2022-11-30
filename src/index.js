import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//this makes the socket available to all components, 
import { SocketContext, socket } from './context/socket'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketContext.Provider value={socket}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </SocketContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
