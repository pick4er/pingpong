import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Loader from 'elements/Loader'
import { ButtonModes as Modes } from 'dictionary'

import './index.scss'

function Button(props) {
  const {
    type,
    mode,
    onClick,
    children,
    isLoading,
    isDisabled,
    className,
    withOutline,
    withTransition,
  } = props

  const isTransparent = mode === Modes.Transparent
  const isBlue = mode === Modes.Blue

  const classNames = cx({
    /* service */
    button: true,
    'button_with-outline': withOutline,
    button_disabled: isDisabled,
    button_transition: withTransition,
    button_transparent: isTransparent,
    [className]: className,

    /* text */
    'button-text': true,
    'button-text_white': !isTransparent,
    'button-text_black': isTransparent,
    'button-text_blue-active': isTransparent,

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
  withTransition: true,
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
  isLoading: T.bool,
  isDisabled: T.bool,
  children: T.node,
  withOutline: T.bool,
  withTransition: T.bool,
  mode: T.oneOf(Object.values(Modes)),
  type: T.oneOf(['submit', 'button', 'reset']),
}

export default Button
