import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import Icon from 'elements/Icon'
import Tag from 'elements/ThemeTag'
import Heading from 'elements/Heading'
import Button from 'elements/Button'
import { logoutAction } from 'flux/modules/user'
import UserCredentialsTile from './UserCredentialsTile'

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
    } else {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }

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
        margin="m2_left"
        text="button-text text_normal"
        bg="ibutton_blue"
        height="hgt6"
        outline="ioutline6_blue"
      >
        Выйти
        <Icon iconName="LogoutIcon" margin="m1_left" />
      </Button>

      <Button
        mode="transparent"
        onClick={toggleFullScreen}
        margin="m2_left m-1_right"
        padding="p1_width"
        bg="ibutton_blue"
        height="hgt6"
        outline="ioutline6_blue"
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
