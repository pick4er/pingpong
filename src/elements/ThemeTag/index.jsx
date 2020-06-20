import React, { useMemo } from 'react'
import T from 'prop-types'
import cx from 'classnames'

const createTag = (margin, padding) => ({ tagName: TagName, className, ...rest }) => {
  const cl = cx([
    margin,
    padding,
    className,
  ])

  return (
    <TagName className={cl} {...rest} />
  )
}

createTag.defaultProps = {
  margin: undefined,
  padding: undefined
}

createTag.propTypes = {
  margin: T.string,
  padding: T.string,
}

export const withTheme = (Component) => (props) => {
  const {
    margin,
    padding
  } = props

  const TagComponent = useMemo(() => createTag(margin, padding), [margin, padding])

  return (
    <Component tag={TagComponent} {...props} />
  )
}
