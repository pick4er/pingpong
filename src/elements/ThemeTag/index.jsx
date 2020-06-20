import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import pick from 'lodash.pick'
import omit from 'lodash.omit'

import { TagNames } from 'dictionary'
import { memoize } from 'helpers'

// TODO: precise types
const styleTypes = {
  margin: T.string, // m1, m2... only
  padding: T.string, // p1, p2... only
  width: T.string, // w1, w2... only
  height: T.string, // hgt1, hgt2... only
  borderRadius: T.string, // br1, ...
  display: T.string, // fr, fc, ...
  shadow: T.string, // sh1, ...
  bg: T.string, // bg_white, bg_error
  overflow: T.string, // ellipsis
  text: T.string, // txt1, txt2, ..., h1, h2, ...
  fGrow: T.string, // fgrow1, fgrow2, ...
  animation: T.string, // ...?
  color: T.string,
}
const styleProps = Object.keys(styleTypes)
const styleDefaults = styleProps.reduce(
  (acc, prop) => ({
    ...acc,
    [prop]: undefined,
  }),
  {}
)

/* eslint-disable react/jsx-props-no-spreading, no-param-reassign */
const Tag = ({ className, tagName: TagName, ...rest }) => (
  <TagName
    className={cx([
      Object.values(pick(rest, styleProps)),
      className,
    ])}
    {...omit(rest, styleProps)}
  />
)

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

export const withTheme = (Component) => {
  Component.propTypes = {
    ...Component.propTypes,
    tag: T.elementType,
  }

  const createTag = memoize(
    (tagProps) => ({
      tagName,
      className,
      ...componentProps
    }) => (
      /* TODO: remove undefined object values in tagProps and componentProps */
      <Tag
        {...tagProps}
        {...componentProps}
        tagName={tagName}
        className={className}
      />
    )
  )

  const ThemedComponent = (props) => (
    /* TODO: force-delete className from props */
    <Component
      tag={createTag(pick(props, styleProps))}
      {...props}
    />
  )

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
