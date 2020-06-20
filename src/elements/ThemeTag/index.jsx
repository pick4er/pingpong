import React, { useMemo } from 'react'
import T from 'prop-types'
import cx from 'classnames'

/* eslint-disable react/jsx-props-no-spreading */
const createTag = (margin, padding) => ({
  tagName: TagName,
  className,
  ...rest
}) => {
  const cl = cx([margin, padding, className])

  return <TagName className={cl} {...rest} />
}

export const withTheme = (Component) => {
  function ThemedComponent(props) {
    const { margin, padding } = props

    const TagComponent = useMemo(
      () => createTag(margin, padding),
      [margin, padding]
    )

    return <Component tag={TagComponent} {...props} />
  }

  ThemedComponent.defaultProps = {
    ...ThemedComponent.defaultProps,
    margin: undefined,
    padding: undefined,
  }

  ThemedComponent.propTypes = {
    ...Component.propTypes,
    margin: T.string,
    padding: T.string,
  }

  return ThemedComponent
}
/* eslint-enable react/jsx-props-no-spreading */
