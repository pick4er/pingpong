import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function Link(props) {
  const { children, href, className } = props

  const classNames = cx({
    link: true,
    [className]: className,
  })

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={classNames}
    >
      {children}
    </a>
  )
}

Link.defaultProps = {
  className: '',
}

Link.propTypes = {
  children: T.elementType.isRequired,
  href: T.string.isRequired,
}

export default Link
