import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import Icon from 'elements/Icon'
import Tag from 'elements/ThemeTag'
import {
  selectLogin,
  selectSublogin,
} from 'flux/modules/user'

import './index.scss'

function UserCredentialsTile({ login, sublogin }) {
  // if credantials lost in local storage
  if (!login && !sublogin) {
    return null
  }

  return (
    <Tag
      tagName="div"
      border="border"
      className="user-credentials-tile"
    >
      {login && (
        <Tag
          tagName="div"
          className="user-credentials-tile__text"
          overflow="ellipsis"
        >
          {login}
        </Tag>
      )}
      {login && sublogin && (
        <Icon
          iconName="SmallSeparatorIcon"
          margin="m1_width"
        />
      )}
      {sublogin && (
        <Tag
          tagName="div"
          overflow="ellipsis"
          className="user-credentials-tile__text"
        >
          {sublogin}
        </Tag>
      )}
    </Tag>
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
