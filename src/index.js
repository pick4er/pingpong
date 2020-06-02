import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import Loading from 'pages/Loading'
import routes from 'router'
import createStore from 'flux'
import history from 'router/history'

import 'styles/index.scss'

const App = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve((() => import('App'))()),
        /* wait a bit to enjoy our fancy loader :) */
        500
      )
    )
)

const { store, persistor } = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Suspense fallback={<Loading />}>
            <App routes={routes} />
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
