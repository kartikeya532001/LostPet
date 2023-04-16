import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/CSS/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
export const socket = io.connect(process.env.REACT_APP_url_socket);


console.log(process.env.REACT_APP_url_backend);
console.log(process.env.REACT_APP_url_socket);
console.log(process.env.url);

ReactDOM.render(
    <>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </>,
    document.getElementById('root')
);
