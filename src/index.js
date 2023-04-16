import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/CSS/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
export const socket = io.connect("http://localhost:5001");


console.log(process.env.REACT_APP_url_backend);
console.log(process.env.REACT_APP_url_socket);

ReactDOM.render(
    <>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </>,
    document.getElementById('root')
);
