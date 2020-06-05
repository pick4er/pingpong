import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Button from 'elements/Button'
import { ButtonModes } from 'dictionary'

import './index.scss'

function IconButton({
  className,
  textClassName,
  iconClassName,
  children,
  direction,
  mode,
  type,
  onClick,
  withOutline,
  icon: IconComponent,
}) {
  const classNames = cx([
    'icon-button',
    withOutline && 'icon-button_with-outline',
    className,
  ])
  const iconCl = cx(['icon-button__icon', iconClassName])

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
