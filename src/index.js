import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import App from 'layout/App'
import store from 'flux'
import routes from 'router'
import history from 'router/history'

import 'styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App routes={routes} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
