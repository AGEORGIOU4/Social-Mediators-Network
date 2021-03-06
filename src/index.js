import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


import store from './store'

import { icons } from './assets/icons'

React.icons = icons

ReactDOM.render(
  <Auth0Provider
    domain="dev-iclaim.eu.auth0.com"
    clientId="NEjR8ltverXxKQhRFE23KFwWS0P1IVhm"
    redirectUri={window.location.origin}

  >
    <Provider store={store}>
      <App />
    </Provider>


  </Auth0Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorkerRegistration.register();

reportWebVitals();
