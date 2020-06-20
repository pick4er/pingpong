import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import pick from 'lodash.pick'
import omit from 'lodash.omit'

import { TagNames } from 'dictionary'
import { memoize } from 'helpers'

const styleProps = [
  'margin',
  'padding',
  'width',
  'borderRadius',
  'display',
]

const styleDefaults = styleProps.reduce(
  (acc, prop) => ({
    ...acc,
    [prop]: undefined,
  }),
  {}
)

// TODO: precise types
const styleTypes = {
  margin: T.string,
  padding: T.string,
  width: T.string,
  borderRadius: T.string,
  display: T.string,
}

/* eslint-disable react/jsx-props-no-spreading, no-param-reassign */
function Tag({ className, tagName: TagName, ...rest }) {
  const styleClassNames = pick(rest, styleProps)
  const cl = cx([Object.values(styleClassNames), className])

  return (
    <TagName className={cl} {...omit(rest, styleProps)} />
  )
}

Tag.defaultProps = {
  ...styleDefaults,
  className: undefined,
  tagName: undefined,
}

Tag.propTypes = {
  ...styleTypes,
  className: T.string,
  tagName: (props, propName) => {
    const isDomTag =
      TagNames.indexOf(props[propName]) !== -1
    const isReactComponent =
      typeof props[propName] === 'object'

    if (!(isDomTag || isReactComponent)) {
      return new Error(
        `Invalid tagName prop type '${props[propName]}' supplied to Tag element`
      )
    }

    return undefined
  },
}

export default Tag

const createTag = memoize(
  (tagStyleProps) => ({ tagName, className, ...rest }) => (
    <Tag
      {...rest}
      {...tagStyleProps}
      tagName={tagName}
      className={className}
    />
  )
)

export const withTheme = (Component) => {
  Component.propTypes = {
    ...Component.propTypes,
    tag: T.elementType,
  }

  function ThemedComponent(props) {
    /* force-delete className, margin, padding etc. from props may be? */
    return (
      <Component
        tag={createTag(pick(props, styleProps))}
        {...props}
      />
    )
  }

  ThemedComponent.defaultProps = {
    ...Component.defaultProps,
    ...styleDefaults,
  }

  ThemedComponent.propTypes = {
    ...Component.propTypes,
    ...styleTypes,
  }

  return ThemedComponent
}
/* eslint-enable react/jsx-props-no-spreading, no-param-reassign */
