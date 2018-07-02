import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Store from './Store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<HashRouter>
    <Provider store={ Store }>
        <App />     
    </Provider>
</HashRouter>
, document.getElementById('root'));
registerServiceWorker();
