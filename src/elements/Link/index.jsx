import React from 'react'
import T from 'prop-types'

import { withTheme } from 'elements/ThemeTag'

const Link = ({ children, href, tag: Tag }) => (
  <Tag
    tagName="a"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="link-text"
  >
    {children}
  </Tag>
)

Link.propTypes = {
  children: T.elementType.isRequired,
  href: T.string.isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(Link)
