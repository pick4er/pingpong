import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Button from 'elements/Button'
import { ButtonModes } from 'dictionary'

import './index.scss'

function IconButton(props) {
  const {
    className,
    textClassName,
    iconClassName,
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
  const iconCl = cx({
    'icon-button__icon': true,
    [iconClassName]: iconClassName,
  })

  return (
    <Button
      type={type}
      mode={mode}
      textClassName={textClassName}
      onClick={onClick}
      withOutline={withOutline}
      className={classNames}
    >
      <span className="icon-button__content">
        {direction === 'left' && (
          <IconComponent className={iconCl} />
        )}
        {children && (
          <span className="icon-button__text">
            {children}
          </span>
        )}
        {direction === 'right' && (
          <IconComponent className={iconCl} />
        )}
      </span>
    </Button>
  )
}

IconButton.defaultProps = {
  className: '',
  mode: ButtonModes.blue,
  children: '',
  withOutline: true,
  textClassName: '',
  type: 'button',
  direction: 'left',
  iconClassName: '',
  onClick: () => {},
}

IconButton.propTypes = {
  withOutline: T.bool,
  icon: T.elementType.isRequired,
  children: T.elementType,
  type: T.oneOf(['submit', 'button', 'reset']),
  onClick: T.func,
  direction: T.oneOf(['left', 'right']),
  mode: T.oneOf(Object.values(ButtonModes)),
  className: T.string,
  textClassName: T.string,
  iconClassName: T.string,
}

export default IconButton
