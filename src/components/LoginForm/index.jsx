import React, { useState } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import Input from 'elements/Input'
import { loginAction } from 'flux/modules/user'
import {
  latinOnly,
  emailOrLogin,
  startsWithLetter,
  moreThanXSymbols,
} from 'helpers/validators'

const validators = {
  login: [
    moreThanXSymbols(4),
    latinOnly,
    startsWithLetter,
    emailOrLogin,
  ],
  sublogin: [
    moreThanXSymbols(4),
    latinOnly,
    startsWithLetter,
  ],
  password: [
    moreThanXSymbols(8),
    latinOnly,
    moreThanXSymbols,
  ],
}

function LoginForm(props) {
  const [showErrors, setShowErrors] = useState(false)

  const { login } = props

  const onSubmit = ($event) => {
    $event.preventDefault()
    const data = {
      login: $event.target.login.value,
      sublogin: $event.target.sublogin.value,
      password: $event.target.password.value,
    }

    debugger
    $event.target.reset()
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        isRequired
        name="login"
        label="Логин"
        showErrors={showErrors}
        validators={validators.login}
        type="text"
      />

      <Input
        name="sublogin"
        label="Сублогин"
        showErrors={showErrors}
        validators={validators.sublogin}
        type="text"
      />

      <Input
        isRequired
        label="Пароль"
        name="password"
        showErrors={showErrors}
        validators={validators.password}
        type="password"
      />

      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: T.func.isRequired,
}

const mapDispatchToProps = {
  login: loginAction,
}

export default connect(null, mapDispatchToProps)(LoginForm)
