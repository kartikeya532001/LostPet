import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/CSS/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
const fs = require('fs');
const path = require('path');
const os = require('os');
require("dotenv").config();
export const socket = io.connect("http://localhost:5001");


console.log(process.env.url_backend);

ReactDOM.render(
    <>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </>,
    document.getElementById('root')
);
