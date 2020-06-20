import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import Icon from 'elements/Icon'
import Tag from 'elements/ThemeTag'
import Heading from 'elements/Heading'
import Button from 'elements/Button'
import { logoutAction } from 'flux/modules/user'
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

  const iconButtonCl = cx({
    text_normal: true,
    'user-header__logout-icon-button': true,
  })

  return (
    <Tag
      tagName="div"
      display="fr"
      align="center"
      padding="p2_height p3_width"
      separator="sep_bottom"
    >
      <Icon iconName="LogoIcon" />
      <Heading
        tagName="h5"
        text="h5"
        margin="m0 m4_left"
        fGrow="grow1"
      >
        API-консолька
      </Heading>

      <UserCredentialsTile />

      <Button
        mode="transparent"
        onClick={logout}
        direction="right"
        className={iconButtonCl}
      >
        <Icon iconName="LogoutIcon" />
        Выйти
      </Button>

      <Button
        mode="transparent"
        direction="right"
        onClick={toggleFullScreen}
      >
        <Icon
          iconName={
            isFullscreen
              ? 'SmallScreenIcon'
              : 'FullScreenIcon'
          }
        />
      </Button>
    </Tag>
  )
}

UserHeader.propTypes = {
  logout: T.func.isRequired,
}

const mapDispatchToProps = {
  logout: logoutAction,
}

export default connect(null, mapDispatchToProps)(UserHeader)
