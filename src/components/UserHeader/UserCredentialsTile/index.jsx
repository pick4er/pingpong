import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import SmallSeparatorIcon from 'assets/separatorS.svg'

import './index.scss'

function UserCredentialsTile(props) {
  const { login, sublogin, className } = props

  const classNames = cx({
    'user-credentials-tile': true,
    [className]: className
  })

  return (
    <div className={classNames}>
      <span className="user-credentials-tile__login">{login}</span>
      {sublogin && (
        <>
          <img src={SmallSeparatorIcon} className="user-credentials-tile__separator" alt="small-separator" />
          <span className="user-credentials-tile__sublogin">{sublogin}</span>
        </>
      )}
    </div>
  )
}

UserCredentialsTile.defaultProps = {
  className: '',
  sublogin: '',
}

UserCredentialsTile.propTypes = {
  className: T.string,
  login: T.string.isRequired,
  sublogin: T.string,
}

export default UserCredentialsTile