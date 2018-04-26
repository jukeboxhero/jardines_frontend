import React from 'react';
import ReactDOM from 'react-dom';
import DashApp from './dashApp';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
import { verifyCredentials } from './redux-token-auth-config';
import { store } from './redux/store';

// authorization key mapping
const authKeys = {
  'access-token': 'auth_token',
  'client': 'client_id',
  'expiry': 'expiry',
  'uid': 'uid'
};

// check to verify if we're logged in or not
verifyCredentials(store);

// listen for oauth login callback
const receiveMessage = (event) => {
  switch(event.data.message) {
    case 'deliverCredentials':
      for (var key in authKeys) {
        let value = authKeys[key];
        localStorage.setItem(key, event.data[value])
      };
      localStorage['token-type'] = 'Bearer';
      verifyCredentials(store);
      window.location.replace('/dashboard');
  }
}
window.addEventListener('message', receiveMessage);

// render the app!
// TODO: once verifycredentials correctly returns a promise, change the following
// line to sit inside the `then` block rather than the timeout
setTimeout(function() {
  ReactDOM.render(<DashApp />, document.getElementById('root'));
}, 1000);

registerServiceWorker();
