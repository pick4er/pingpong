import React from 'react'

import LoginForm from 'components/LoginForm'
import Link from 'elements/Link'
import LogoIcon from 'assets/logo.svg'

import './index.scss'

function LoginPage() {
  return (
    <div className="login-page">
      <img src={LogoIcon} className="login-page__icon" />
      <LoginForm className="login-page__login-form" />
      <Link className="login__link">@pick4er</Link>
    </div>
  )
}

export default LoginPage
