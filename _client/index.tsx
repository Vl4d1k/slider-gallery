import React from 'react';
import {hydrate} from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';


loadableReady(() => {
    hydrate((
        <React.StrictMode>
            <Router history={createBrowserHistory()}>
             <App />
            </Router>
        </React.StrictMode>
    ), document.getElementById('root'))
})

reportWebVitals();
