import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import App from 'App'
import routes from 'router'
import createStore from 'flux'
import history from 'router/history'

import 'styles/index.scss'

const { store, persistor } = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <App routes={routes} />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
