import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import FormInput from 'elements/FormInput'
import Button from 'elements/Button'
import Notification from 'elements/Notification'
import {
  loginAction,
  selectIsLoading,
} from 'flux/modules/user'
import { selectLoginNotification } from 'flux/modules/notifications'
import {
  latinOnly,
  required,
  emailOrLogin,
  startsWithLetter,
  moreThanXSymbols,
} from 'helpers/validators'
import { NotificationTypes } from 'dictionary'

import './index.scss'

const validators = {
  login: [
    required,
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
  password: [required, moreThanXSymbols(4), latinOnly],
}

const getFormDomEl = () =>
  document.getElementById('login-form')

const checkIfFormError = (isError, setIsError) => {
  const formDomEl = getFormDomEl()

  const { login, sublogin, password } = formDomEl
  const nextIsError =
    [
      login.dataset.error,
      sublogin.dataset.error,
      password.dataset.error,
    ].filter(Boolean).length > 0

  if (isError !== nextIsError) {
    setIsError(nextIsError)
  }
}

function LoginForm({
  isLoading,
  loginUser,
  loginNotification,
}) {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const formDomEl = getFormDomEl()

    const onChange = () =>
      checkIfFormError(isError, setIsError)
    formDomEl.addEventListener('change', onChange)
    return () => {
      formDomEl.removeEventListener('change', onChange)
    }
  }, [isError, setIsError])

  const onSubmit = ($event) => {
    $event.preventDefault()
    const {
      target: { login, sublogin, password },
    } = $event

    loginUser({
      login: login.value,
      sublogin: sublogin.value,
      password: password.value,
    })
  }

  const classNames = cx([
    'login-form',
    'flex-column',
  ])
  const headerCl = cx([
    'h5',
    'm0',
    'm4_bottom',
  ])
  const notificationCl = cx([
    'login-form__notification',
    'notification-animation_l',
    'error-background',
  ])

  return (
    <form
      onSubmit={onSubmit}
      className={classNames}
      id="login-form"
    >
      <h5 className={headerCl}>API-консолька</h5>

      <Notification
        withIcon
        notification={loginNotification}
        className={notificationCl}
      />

      <FormInput
        isRequired
        name="login"
        label="Логин"
        className="login-form__input"
        validators={validators.login}
        type="text"
      />

      <FormInput
        name="sublogin"
        label="Сублогин"
        className="login-form__input"
        validators={validators.sublogin}
        type="text"
      />

      <FormInput
        isRequired
        label="Пароль"
        name="password"
        className="login-form__input"
        nativeInputClassName="input-text_password"
        validators={validators.password}
        type="password"
      />

      <Button
        type="submit"
        mode="blue"
        isDisabled={isError}
        className="login-form__button"
        isLoading={isLoading}
      >
        Войти
      </Button>
    </form>
  )
}

LoginForm.defaultProps = {
  loginNotification: {
    type: undefined,
    message: '',
    title: '',
  },
}

LoginForm.propTypes = {
  loginUser: T.func.isRequired,
  isLoading: T.bool.isRequired,
  loginNotification: T.shape({
    type: T.oneOf(Object.values(NotificationTypes)),
    message: T.string,
    title: T.string,
  }),
}

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
  loginNotification: selectLoginNotification(state),
})
const mapDispatchToProps = {
  loginUser: loginAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
