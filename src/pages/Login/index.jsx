import React from 'react'
import LoginForm from 'components/LoginForm'
import LogoIcon from 'assets/logo.svg'

import './index.scss'

function LoginPage() {
  return (
    <div className="login-page">
      <img src={LogoIcon} className="login-page__icon" />
      <LoginForm className="login-page__login-form" />
    </div>
  )
}

export default LoginPage
