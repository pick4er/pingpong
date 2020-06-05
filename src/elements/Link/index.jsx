import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

function Link({ children, href, className }) {
  const classNames = cx(['link-text', className])

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
  className: T.string,
}

export default Link
