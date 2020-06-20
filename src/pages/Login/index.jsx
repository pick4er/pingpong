import React from 'react'

import Icon from 'elements/Icon'
import LoginForm from 'components/LoginForm'
import Link from 'elements/Link'

import './index.scss'

function LoginPage() {
  return (
    <div className="page">
      <Icon iconName="LogoIcon" margin="m4_bottom" />
      <LoginForm className="login-page__login-form" />
      <Link
        href="https://github.com/pick4er"
        className="login__link"
      >
        @pick4er
      </Link>
    </div>
  )
}

export default LoginPage
