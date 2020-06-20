import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Icon from 'elements/Icon'
import Tag from 'elements/ThemeTag'

import './index.scss'

function Loader({ size, color }) {
  const classNames = cx({
    loader: true,
    [`loader_${size}`]: true,
    [`loader_${color}`]: true,
  })

  return (
    <Tag tagName="span" className={classNames}>
      <Icon
        iconName="LoaderIcon"
        animation="loading-animation"
      />
    </Tag>
  )
}

Loader.defaultProps = {
  size: 's',
  color: 'white',
}

Loader.propTypes = {
  size: T.oneOf(['s', 'l']),
  color: T.oneOf(['black', 'white']),
}

export default Loader
