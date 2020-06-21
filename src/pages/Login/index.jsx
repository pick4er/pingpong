import React from 'react'

import Icon from 'elements/Icon'
import LoginForm from 'components/LoginForm'
import Link from 'elements/Link'
import Tag from 'elements/ThemeTag'

const LoginPage = () => (
  <Tag tagName="div" className="page">
    <Icon iconName="LogoIcon" margin="m4_bottom" />
    <LoginForm />
    <Link href="https://github.com/pick4er" margin="m4_top">
      @pick4er
    </Link>
  </Tag>
)

export default LoginPage
