import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import LoaderIcon from 'assets/loader.svg'

import './index.scss'

function Loader(props) {
  const { size } = props

  const classNames = cx({
    loader: true,
    loader_s: size === 's',
    loader_m: size === 'm',
    loader_l: size === 'l',
  })

  return (
    <img
      src={LoaderIcon}
      className={classNames}
      alt="pingpong-loader"
    />
  )
}

Loader.defaultProps = {
  size: 's',
}

Loader.propTypes = {
  size: T.oneOf(['s', 'm', 'l']),
}

export default Loader
