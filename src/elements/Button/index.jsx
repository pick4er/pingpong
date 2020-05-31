import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Loader from 'elements/Loader'

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
    button_blue: mode === 'blue',
    button_red: mode === 'red',
    button_transparent: mode === 'transparent',
    button_disabled: isDisabled,
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
  mode: 'blue',
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
  mode: T.oneOf(['blue', 'red', 'transparent']),
  type: T.oneOf(['submit', 'button', 'reset']),
}

export default Button
