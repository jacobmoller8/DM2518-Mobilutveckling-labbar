import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';


ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('root'));

