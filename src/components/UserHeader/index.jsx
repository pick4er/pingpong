import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import LogoIcon from 'assets/logo.svg'
import {
  selectLogin,
  selectSublogin,
} from 'flux/modules/user'
import IconButton from 'elements/IconButton'

import { ReactComponent as LogoutIconComponent } from 'assets/logout.svg'
import { ReactComponent as FullScreenIconComponent } from 'assets/fullscreen.svg'
import UserCredentialsTile from './UserCredentialsTile'

import './index.scss'

function UserHeader(props) {
  const { login, sublogin } = props

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

      <UserCredentialsTile
        login={login}
        sublogin={sublogin}
      />

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

UserHeader.defaultProps = {
  sublogin: '',
}

UserHeader.propTypes = {
  login: T.string.isRequired,
  sublogin: T.string,
}

const mapStateToProps = (state) => ({
  login: selectLogin(state),
  sublogin: selectSublogin(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHeader)
