import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Button from 'elements/Button'
import { ButtonModes } from 'dictionary'

import './index.scss'

function IconButton(props) {
  const {
    className,
    icon: IconComponent,
    children,
    direction,
    mode,
    type,
    onClick,
  } = props

  const classNames = cx({
    'icon-button': true,
    [className]: className,
  })

  return (
    <Button
      type={type}
      onClick={onClick}
      mode={mode}
      className={classNames}
    >
      <span className="icon-button__content">
        {direction === 'left' && (
          <IconComponent className="icon-button__icon" />
        )}
        {children && (
          <span className="icon-button__text">
            {children}
          </span>
        )}
        {direction === 'right' && (
          <IconComponent className="icon-button__icon" />
        )}
      </span>
    </Button>
  )
}

IconButton.defaultProps = {
  className: '',
  mode: ButtonModes.blue,
  children: '',
  isLoading: false,
  type: 'button',
  onClick: () => {},
}

IconButton.propTypes = {
  className: T.string,
  icon: T.any.isRequired,
  children: T.elementType,
  direction: T.oneOf(['left', 'right']).isRequired,
  mode: T.oneOf(Object.values(ButtonModes)),
  type: T.oneOf(['submit', 'button', 'reset']),
  onClick: T.func,
}

export default IconButton
