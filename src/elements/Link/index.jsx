import React from 'react'
import T from 'prop-types'

import { withTheme } from 'elements/ThemeTag'

const Link = ({ children, href, tag: LinkTag }) => (
  <LinkTag
    tagName="a"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="link-text"
  >
    {children}
  </LinkTag>
)

Link.propTypes = {
  children: T.elementType.isRequired,
  href: T.string.isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(Link)
