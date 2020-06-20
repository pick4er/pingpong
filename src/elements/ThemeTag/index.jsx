import React, { useMemo } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import { TagNames } from 'dictionary'

/* eslint-disable react/jsx-props-no-spreading, no-param-reassign */
function Tag({
  margin,
  padding,
  width,
  className,
  tagName: TagName,
  ...rest
}) {
  const cl = cx([margin, padding, width, className])

  return <TagName className={cl} {...rest} />
}

Tag.defaultProps = {
  margin: undefined,
  padding: undefined,
  width: undefined,
  className: undefined,
  tagName: undefined,
}

Tag.propTypes = {
  margin: T.string,
  padding: T.string,
  width: T.string,
  className: T.string,
  tagName: (props, propName) => {
    const isDomTag =
      TagNames.indexOf(props[propName]) !== -1
    const isReactComponent =
      typeof props[propName] === 'object'

    if (!(isDomTag || isReactComponent)) {
      return new Error(
        `Invalid tagName prop type '${props[propName]}'' supplied to Tag element`
      )
    }

    return undefined
  },
}

export default Tag

const createTag = (margin, padding, width) => ({
  tagName,
  className,
  ...rest
}) => (
  <Tag
    margin={margin}
    padding={padding}
    width={width}
    tagName={tagName}
    className={className}
    {...rest}
  />
)

export const withTheme = (Component) => {
  Component.propTypes = {
    ...Component.propTypes,
    tag: T.elementType,
  }

  function ThemedComponent(props) {
    const { margin, padding, width } = props

    const TagComponent = useMemo(
      () => createTag(margin, padding, width),
      [margin, padding, width]
    )

    /* force-delete className, margin, padding etc. from props may be? */
    return <Component tag={TagComponent} {...props} />
  }

  ThemedComponent.defaultProps = {
    ...Component.defaultProps,
    margin: undefined,
    padding: undefined,
    width: undefined,
  }

  ThemedComponent.propTypes = {
    ...Component.propTypes,
    margin: T.string,
    padding: T.string,
    width: T.string,
  }

  return ThemedComponent
}
/* eslint-enable react/jsx-props-no-spreading, no-param-reassign */
