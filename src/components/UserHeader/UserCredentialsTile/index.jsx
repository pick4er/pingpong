import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import SmallSeparatorIcon from 'assets/separatorS.svg'
import {
  selectLogin,
  selectSublogin,
} from 'flux/modules/user'

import './index.scss'

function UserCredentialsTile(props) {
  const { login, sublogin, className } = props

  const classNames = cx({
    'user-credentials-tile': true,
    border: true,
    [className]: className,
  })

  return (
    <div className={classNames}>
      {login && (
        <span className="user-credentials-tile__login">
          {login}
        </span>
      )}
      {login && sublogin && (
        <img
          src={SmallSeparatorIcon}
          className="user-credentials-tile__separator"
          alt="small-separator"
        />
      )}
      {sublogin && (
        <span className="user-credentials-tile__sublogin">
          {sublogin}
        </span>
      )}
    </div>
  )
}

UserCredentialsTile.defaultProps = {
  className: '',
  sublogin: '',
  login: '',
}

UserCredentialsTile.propTypes = {
  className: T.string,
  login: T.string,
  sublogin: T.string,
}

const mapStateToProps = (state) => ({
  login: selectLogin(state),
  sublogin: selectSublogin(state),
})

export default connect(mapStateToProps)(UserCredentialsTile)
