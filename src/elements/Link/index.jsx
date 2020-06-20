import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

function Link({ children, href, margin }) {
  const classNames = cx(['link-text', margin])

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
  margin: undefined,
}

Link.propTypes = {
  children: T.elementType.isRequired,
  href: T.string.isRequired,
  margin: T.string,
}

export default Link
