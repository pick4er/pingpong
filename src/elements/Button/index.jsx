import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Loader from 'elements/Loader'
import { ButtonModes as Modes } from 'dictionary'

import './index.scss'

function Button({
  type,
  mode,
  onClick,
  children,
  isLoading,
  isDisabled,
  className,
  textClassName,
  withOutline,
}) {
  const isTransparent = mode === Modes.Transparent
  const isBlue = mode === Modes.Blue

  const classNames = cx({
    /* service */
    button: true,
    'button_with-outline': withOutline,
    button_disabled: isDisabled,
    button_transparent: isTransparent,
    [className]: className,

    /* text */
    'button-text': true,
    text_white: !isTransparent,
    text_black: isTransparent,
    text_blue_active: isTransparent,
    [textClassName]: textClassName,

    /* background */
    'gradient-background_blue': isBlue,
    'gradient-background_disabled': isDisabled,
    background_transparent: isTransparent,
  })

  return (
    <button
      type={type} // eslint-disable-line react/button-has-type
      onClick={onClick}
      disabled={isDisabled}
      className={classNames}
    >
      {isLoading ? <Loader /> : children}
    </button>
  )
}

Button.defaultProps = {
  onClick: () => {},
  className: '',
  textClassName: '',
  withOutline: true,
  mode: Modes.blue,
  isLoading: false,
  type: 'button',
  children: '',
  isDisabled: false,
}

Button.propTypes = {
  onClick: T.func,
  className: T.string,
  textClassName: T.string,
  isLoading: T.bool,
  isDisabled: T.bool,
  children: T.node,
  withOutline: T.bool,
  mode: T.oneOf(Object.values(Modes)),
  type: T.oneOf(['submit', 'button', 'reset']),
}

export default Button
