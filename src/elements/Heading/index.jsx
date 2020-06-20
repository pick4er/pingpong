import React from 'react'
import T from 'prop-types'

import { withTheme } from 'elements/ThemeTag'
import { headingTags } from 'dictionary'

const Heading = ({ tag: Tag, tagName, children }) => (
  <Tag tagName={tagName} className={tagName}>
    {children}
  </Tag>
)

Heading.propTypes = {
  tagName: T.oneOf(headingTags).isRequired,
  tag: T.elementType.isRequired,
  children: T.elementType.isRequired,
}

export default withTheme(Heading)
