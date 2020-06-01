import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Loader from 'elements/Loader'
import { ButtonModes } from 'dictionary'

import './index.scss'

function Button(props) {
  const {
    isLoading,
    text,
    type,
    onClick,
    children,
    mode,
    isDisabled,
    className,
  } = props

  const classNames = cx({
    button: true,
    'button-text_white': true,
    'button-text': true,
    button_blue: mode === ButtonModes.Blue,
    button_red: mode === ButtonModes.Red,
    button_transparent: mode === ButtonModes.Transparent,
    button_disabled: isDisabled,
    'gradient-background_disabled': isDisabled,
    'gradient-background_blue': mode === ButtonModes.Blue,
    [className]: className,
  })

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classNames}
    >
      {isLoading ? <Loader /> : children || text}
    </button>
  )
}

Button.defaultProps = {
  onClick: () => {},
  className: '',
  mode: ButtonModes.blue,
  isLoading: false,
  type: 'button',
  children: '',
  isDisabled: false,
}

Button.propTypes = {
  onClick: T.func,
  className: T.string,
  isLoading: T.bool,
  isDisabled: T.bool,
  children: T.elementType,
  mode: T.oneOf(Object.values(ButtonModes)),
  type: T.oneOf(['submit', 'button', 'reset']),
}

export default Button
