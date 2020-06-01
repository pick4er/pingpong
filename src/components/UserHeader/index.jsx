import React from 'react'
import cx from 'classnames'

import IconButton from 'elements/IconButton'
import LogoIcon from 'assets/logo.svg'
import { ReactComponent as LogoutIconComponent } from 'assets/logout.svg'
import { ReactComponent as FullScreenIconComponent } from 'assets/fullscreen.svg'
import UserCredentialsTile from './UserCredentialsTile'

import './index.scss'

function UserHeader() {
  const classNames = cx({
    'user-header': true,
    'border-separator_bottom': true,
  })
  const headerCl = cx({
    'user-header__header-text': true,
    'header-text': true,
    'header-text_s': true,
  })

  const iconButtonCl = cx({
    'button-text_normal': true,
    'user-header__logout-icon-button': true,
  })

  return (
    <div className={classNames}>
      <img
        src={LogoIcon}
        className="user-header__icon"
        alt="pingpong-logo-icon"
      />

      <h5 className={headerCl}>API-консолька</h5>

      <UserCredentialsTile />

      <IconButton
        icon={LogoutIconComponent}
        direction="right"
        mode="transparent"
        className={iconButtonCl}
      >
        Выйти
      </IconButton>

      <IconButton
        icon={FullScreenIconComponent}
        direction="right"
        mode="transparent"
        className={iconButtonCl}
      />
    </div>
  )
}

export default UserHeader
