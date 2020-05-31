import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import Input from 'elements/Input'
import Button from 'elements/Button'
import Notification from 'elements/Notification'
import {
  loginAction,
  selectIsLoading,
} from 'flux/modules/user'
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
  const formEl = useRef(null)
  const [isError, setIsError] = useState(false)

  const { className, isLoading } = props

  useEffect(() => {
    const formDomEl = formEl.current

    const checkIfFormError = ($event) => {
      const { form: { login, sublogin, password } } = $event.target

      const possibleErrors = [
        login.dataset.error,
        sublogin.dataset.error,
        password.dataset.error,
      ].filter(Boolean)

      if (isError && possibleErrors.length === 0) {
        setIsError(false)
      } else if (!isError && possibleErrors.length > 0) {
        setIsError(true)
      }

      return undefined
    }

    formDomEl.addEventListener('change', checkIfFormError)
    return () =>
      formDomEl.removeEventListener(
        'change',
        checkIfFormError
      )
  }, [isError, setIsError])

  const onSubmit = ($event) => {
    $event.preventDefault()
    const data = {
      login: $event.target.login.value,
      sublogin: $event.target.sublogin.value,
      password: $event.target.password.value,
    }

    $event.target.reset()
  }

  const classNames = cx({
    'login-form': true,
    [className]: className,
  })

  return (
    <form
      onSubmit={onSubmit}
      className={classNames}
      ref={formEl}
    >
      <h5 className="login-form__header">API-консолька</h5>

      <Notification withIcon className="login-form__notification" />

      <Input
        isRequired
        name="login"
        label="Логин"
        className="login-form__input"
        validators={validators.login}
        type="text"
      />

      <Input
        name="sublogin"
        label="Сублогин"
        className="login-form__input"
        validators={validators.sublogin}
        type="text"
      />

      <Input
        isRequired
        label="Пароль"
        name="password"
        className="login-form__input"
        nativeInputCl=" login-form__input_password"
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
}

LoginForm.propTypes = {
  login: T.func.isRequired,
  className: T.string,
  isLoading: T.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
})
const mapDispatchToProps = {
  login: loginAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
