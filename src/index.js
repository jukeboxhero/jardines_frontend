import React from 'react';
import ReactDOM from 'react-dom';
import DashApp from './dashApp';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
import { verifyCredentials } from './redux-token-auth-config';
import { store } from './redux/store';

verifyCredentials(store);

setTimeout(function() {
  ReactDOM.render(<DashApp />, document.getElementById('root'));
}, 1000);

registerServiceWorker();
