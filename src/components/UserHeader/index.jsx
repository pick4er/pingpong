import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import IconButton from 'elements/IconButton'
import { logoutAction } from 'flux/modules/user'
import { ReactComponent as LogoutIconComponent } from 'assets/logout.svg'
import { ReactComponent as FullScreenIconComponent } from 'assets/fullscreen.svg'
import { ReactComponent as SmallScreenIconComponent } from 'assets/smallscreen.svg'
import LogoIcon from 'assets/logo.svg'
import UserCredentialsTile from './UserCredentialsTile'

import './index.scss'

function UserHeader({ logout }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // INIT FULL SCREEN
  useEffect(() => {
    if (document.fullscreenElement) {
      setIsFullscreen(true)
    }
  }, [setIsFullscreen])

  // SUBSCRIBE ON FULLSCREEN CHANGE
  useEffect(() => {
    const onFullscreenChange = () => {
      if (isFullscreen && !document.fullscreenElement) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener(
      'fullscreenchange',
      onFullscreenChange
    )
    return () => {
      document.removeEventListener(
        'fullscreenchange',
        onFullscreenChange
      )
    }
  }, [isFullscreen, setIsFullscreen])

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (
      !isFullscreen &&
      !document.fullscreenElement &&
      document.fullscreenEnabled
    ) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }

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
    text_normal: true,
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
        onClick={logout}
        className={iconButtonCl}
      >
        Выйти
      </IconButton>
      <IconButton
        icon={
          isFullscreen
            ? SmallScreenIconComponent
            : FullScreenIconComponent
        }
        direction="right"
        mode="transparent"
        onClick={toggleFullScreen}
        className="user-header__full-screen-button"
      />
    </div>
  )
}

UserHeader.propTypes = {
  logout: T.func.isRequired,
}

const mapDispatchToProps = {
  logout: logoutAction,
}

export default connect(null, mapDispatchToProps)(UserHeader)
