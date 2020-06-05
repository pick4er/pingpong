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

function UserCredentialsTile({ login, sublogin }) {
  // if credantials lost in local storage
  if (!login && !sublogin) {
    return null
  }

  const classNames = cx(['border', 'user-credentials-tile'])
  const loginCl = cx([
    'overflow-ellipsis',
    'user-credentials-tile__text',
  ])
  const subloginCl = cx([
    'overflow-ellipsis',
    'user-credentials-tile__text',
  ])

  return (
    <div className={classNames}>
      {login && <div className={loginCl}>{login}</div>}
      {login && sublogin && (
        <img
          src={SmallSeparatorIcon}
          className="user-credentials-tile__separator"
          alt="small-separator"
        />
      )}
      {sublogin && (
        <div className={subloginCl}>{sublogin}</div>
      )}
    </div>
  )
}

UserCredentialsTile.defaultProps = {
  sublogin: '',
  login: '',
}

UserCredentialsTile.propTypes = {
  login: T.string,
  sublogin: T.string,
}

const mapStateToProps = (state) => ({
  login: selectLogin(state),
  sublogin: selectSublogin(state),
})

export default connect(mapStateToProps)(UserCredentialsTile)
