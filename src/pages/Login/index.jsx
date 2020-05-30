import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import { loginAction } from 'flux/modules/user';

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

  return (
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
  )
}

LoginPage.propTypes = {
  login: T.func.isRequired,
}

const mapDispatchToProps = {
  login: loginAction,
}

export default connect(null, mapDispatchToProps)(LoginPage)
