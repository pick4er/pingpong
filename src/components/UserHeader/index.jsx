import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import LogoIcon from 'assets/logo.svg'

import './index.scss'

function UserHeader(props) {
  return (
    <div className="user-header">
      <img
        src={LogoIcon}
        className="user-header__icon"
        alt="pingpong-logo-icon"
      />

      <h5 className="header-text header-text_s">
        API-консолька
      </h5>
    </div>
  )
}

UserHeader.defaultProps = {}

UserHeader.propTypes = {}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHeader)
