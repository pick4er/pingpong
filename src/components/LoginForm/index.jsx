import React, { useState, useRef, useEffect } from 'react'
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
  validateValues,
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
  password: [
    required,
    moreThanXSymbols(4),
    latinOnly,
    moreThanXSymbols,
  ],
}

const checkIfFormError = (form, setIsError, isError) => {
  const { login, sublogin, password } = form

  const isNextError =
    [
      login.dataset.error,
      sublogin.dataset.error,
      password.dataset.error,
    ].filter(Boolean).length > 0

  if (isError && !isNextError) {
    setIsError(false)
  } else if (!isError && isNextError) {
    setIsError(true)
  }

  return isNextError
}

function LoginForm(props) {
  const formEl = useRef(null)
  const [isError, setIsError] = useState(false)

  const {
    className,
    isLoading,
    loginUser,
    loginNotification,
  } = props

  useEffect(() => {
    const formDomEl = formEl.current

    const onChange = ($event) =>
      checkIfFormError(
        $event.target.form,
        setIsError,
        isError
      )
    formDomEl.addEventListener('change', onChange)
    return () =>
      formDomEl.removeEventListener('change', onChange)
  }, [isError, setIsError])

  const onSubmit = ($event) => {
    $event.preventDefault()
    if (isLoading) {
      return undefined
    }

    const { target } = $event
    const data = {
      login: target.login.value,
      sublogin: target.sublogin.value,
      password: target.password.value,
    }

    const errors = validateValues(data, validators)
    const isFormError =
      Object.values(errors).filter(
        (errArr) => errArr.length > 0
      ).length > 0

    if (isFormError && !isError) {
      setIsError(true)
    } else if (!isFormError && !isError) {
      loginUser(data)
    }

    return undefined
  }

  const classNames = cx({
    'login-form': true,
    [className]: className,
  })
  const headerCl = cx({
    'header-text': true,
    'login-form__header-text': true,
  })
  const notificationCl = cx({
    'login-form__notification': true,
    'notification-animation_l': true,
    'error-background': true,
  })

  return (
    <form
      onSubmit={onSubmit}
      className={classNames}
      ref={formEl}
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
  className: '',
  loginNotification: {
    type: undefined,
    message: '',
    title: '',
  },
}

LoginForm.propTypes = {
  loginUser: T.func.isRequired,
  className: T.string,
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
