import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Icon from 'elements/Icon'
import Tag from 'elements/ThemeTag'

import './index.scss'

const Loader = ({ size, color }) => (
  <Tag
    tagName="span"
    display="fr"
    align="center"
    height="hgt4"
    className={cx([`loader_${size}`, `loader_${color}`])}
  >
    <Icon
      iconName="LoaderIcon"
      animation="loading-animation"
    />
  </Tag>
)

Loader.defaultProps = {
  size: 's',
  color: 'white',
}

Loader.propTypes = {
  size: T.oneOf(['s', 'l']),
  color: T.oneOf(['black', 'white']),
}

export default Loader
