import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function Link(props) {
  const { children, src, className } = props

  const classNames = cx({
    'link': true,
    [className]: className,
  })

  return (
    <a src={src} className={classNames}>{children}</a>
  )
}

Link.defaultProps = {
  className: '',
}

Link.propTypes = {
  children: T.elementType.isRequired,
  src: T.string.isRequired,
}

export default Link