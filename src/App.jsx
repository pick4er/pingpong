import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Redirect, withRouter } from 'react-router-dom'

import { selectIsAuth } from 'flux/modules/user'

function AppLayout(props) {
  const {
    routes,
    isAuth,
    location: { pathname },
  } = props

  if (!isAuth && pathname !== '/login') {
    return <Redirect to="/login" />
  }

  if (isAuth && pathname === '/login') {
    return <Redirect to="/" />
  }

  return renderRoutes(routes)
}

AppLayout.propTypes = {
  routes: T.arrayOf(T.object).isRequired,
  isAuth: T.bool.isRequired,
  location: T.shape({
    pathname: T.string.isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: selectIsAuth(state),
})

export default withRouter(
  connect(mapStateToProps)(AppLayout)
)
