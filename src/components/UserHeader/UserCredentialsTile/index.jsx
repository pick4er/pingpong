import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import {
  selectLogin,
  selectSublogin,
} from 'flux/modules/user'
import SmallSeparatorIcon from 'assets/separatorS.svg'

import './index.scss'

function UserCredentialsTile(props) {
  const { login, sublogin, className } = props

  const classNames = cx({
    'user-credentials-tile': true,
    border: true,
    [className]: className,
  })

  // if credantials lost in local storage
  if (!login && !sublogin) {
    return null
  }

  return (
    <div className={classNames}>
      {login && (
        <div
          className={cx([
            'user-credentials-tile__text',
            'overflow-ellipsis',
            'user-credentials-tile__login',
          ])}
        >
          {login}
        </div>
      )}
      {login && sublogin && (
        <img
          src={SmallSeparatorIcon}
          className="user-credentials-tile__separator"
          alt="small-separator"
        />
      )}
      {sublogin && (
        <div
          className={cx([
            'user-credentials-tile__text',
            'overflow-ellipsis',
            'user-credentials-tile__sublogin',
          ])}
        >
          {sublogin}
        </div>
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
