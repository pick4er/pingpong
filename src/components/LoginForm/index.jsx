import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import FormInput from 'elements/FormInput'
import Button from 'elements/Button'
import Heading from 'elements/Heading'
import Tag from 'elements/ThemeTag'
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

  const classNames = cx(['fc', 'login-form'])
  const notificationCl = cx([
    'm4_bottom',
    'notification-animation_l',
    'error-background',
  ])
  const buttonWidth = cx([])

  return (
    <Tag
      tagName="form"
      onSubmit={onSubmit}
      className={classNames}
      id="login-form"
    >
      <Heading tagName="h5" margin="m0 m4_bottom">
        API-консолька
      </Heading>

      <Notification
        withIcon
        notification={loginNotification}
        className={notificationCl}
      />

      <FormInput
        isRequired
        name="login"
        label="Логин"
        margin="m4_bottom"
        validators={validators.login}
        type="text"
      />

      <FormInput
        name="sublogin"
        label="Сублогин"
        margin="m4_bottom"
        validators={validators.sublogin}
        type="text"
      />

      <FormInput
        isRequired
        label="Пароль"
        name="password"
        margin="m4_bottom"
        validators={validators.password}
        type="password"
      />

      <Button
        type="submit"
        mode="blue"
        width={buttonWidth}
        isDisabled={isError}
        isLoading={isLoading}
      >
        Войти
      </Button>
    </Tag>
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
