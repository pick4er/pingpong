import React, { useState } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import Input from 'elements/Input'
import { loginAction } from 'flux/modules/user'
import {
  latinOnly,
  emailOrLogin,
  startsWithLetter,
  moreThanXSymbols,
} from 'helpers/validators'

import './index.scss'

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

  const { login, className } = props

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

  const classNames = cx({
    'login-form': true,
    [className]: className,
  })

  return (
    <form onSubmit={onSubmit} className={classNames}>
      <h5 className="login-form__header">API-консолька</h5>

      <Input
        isRequired
        name="login"
        label="Логин"
        className="login-form__input"
        showErrors={showErrors}
        validators={validators.login}
        type="text"
      />

      <Input
        name="sublogin"
        label="Сублогин"
        className="login-form__input"
        showErrors={showErrors}
        validators={validators.sublogin}
        type="text"
      />

      <Input
        isRequired
        label="Пароль"
        name="password"
        className="login-form__input"
        showErrors={showErrors}
        validators={validators.password}
        type="password"
      />

      <button type="submit">login</button>
    </form>
  )
}

LoginForm.defaultProps = {
  className: '',
}

LoginForm.propTypes = {
  login: T.func.isRequired,
  className: T.string,
}

const mapDispatchToProps = {
  login: loginAction,
}

export default connect(null, mapDispatchToProps)(LoginForm)
