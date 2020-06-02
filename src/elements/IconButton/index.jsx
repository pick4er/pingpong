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
    withOutline,
  } = props

  const classNames = cx({
    'icon-button': true,
    'icon-button_with-outline': withOutline,
    [className]: className,
  })

  return (
    <Button
      type={type}
      mode={mode}
      onClick={onClick}
      withOutline={withOutline}
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
  withOutline: true,
  type: 'button',
  direction: 'left',
  onClick: () => {},
}

IconButton.propTypes = {
  className: T.string,
  icon: T.any.isRequired,
  withOutline: T.bool,
  children: T.elementType,
  direction: T.oneOf(['left', 'right']),
  mode: T.oneOf(Object.values(ButtonModes)),
  type: T.oneOf(['submit', 'button', 'reset']),
  onClick: T.func,
}

export default IconButton
