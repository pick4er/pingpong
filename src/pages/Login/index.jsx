import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import { loginAction } from 'flux/modules/user';
import { requestAction } from 'flux/modules/requests';

function LoginPage(props) {
  const { login, request } = props

  const onSubmit = ($event) => {
    $event.preventDefault()
    login({
      login: $event.target.login.value,
      sublogin: $event.target.sublogin.value,
      password: $event.target.password.value,
    })

    $event.target.reset()
  }

  const onRequest = ($event) => {
    $event.preventDefault()

    try {
      request(JSON.parse($event.target.request.value))
    } catch (e) {
      console.error(e)
    }

    $event.target.reset()
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="login">
          Login:
          <input name="login" type="text" autoComplete="off" />
        </label>
        <label htmlFor="sublogin">
          Sublogin:
          <input name="sublogin" type="text" autoComplete="off" />
        </label>
        <label htmlFor="password">
          Password:
          <input name="password" type="password" />
        </label>
        <button type="submit">
          login
        </button>
      </form>

      <form onSubmit={onRequest}>
        <label htmlFor="request">
          <textarea name="request" />
        </label>

        <button type="submit">
          request
        </button>
      </form>
    </div>
  )
}

LoginPage.propTypes = {
  login: T.func.isRequired,
  request: T.func.isRequired,
}

const mapDispatchToProps = {
  login: loginAction,
  request: requestAction,
}

export default connect(null, mapDispatchToProps)(LoginPage)
