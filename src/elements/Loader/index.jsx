import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { ReactComponent as LoaderIconComponent } from 'assets/loader.svg'

import './index.scss'

function Loader(props) {
  const { size, color } = props

  const classNames = cx({
    loader: true,
    [`loader_${size}`]: true,
    [`loader_${color}`]: true,
  })

  return (
    <span className={classNames}>
      <LoaderIconComponent className="loading-animation" />
    </span>
  )
}

Loader.defaultProps = {
  size: 's',
  color: 'white',
}

Loader.propTypes = {
  size: T.oneOf(['s', 'l']),
  color: T.oneOf(['black', 'white']),
}

export default Loader
