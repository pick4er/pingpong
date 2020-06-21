import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Loader from 'elements/Loader'
import Tag, { withTheme } from 'elements/ThemeTag'
import { toArray } from 'helpers'
import { ButtonModes as Modes } from 'dictionary'

import './index.scss'

// TODO: improve check via displayName or instanceof
const isIcon = (element) => !!element?.props?.iconName
const directionDisplays = {
  right: 'fr',
  top: 'fcr',
  bottom: 'fc',
}

const renderWithIcon = (children, direction = 'right') => (
  <Tag tagName="div" display={directionDisplays[direction]}>
    {children}
  </Tag>
)

/* eslint-disable no-nested-ternary */
function Button({
  type,
  mode,
  onClick,
  children,
  isLoading,
  direction,
  isDisabled,
  tag: ButtonTag,
}) {
  const withIcon = toArray(children).find(isIcon)

  const isTransparent = mode === Modes.Transparent
  const isBlue = mode === Modes.Blue

  const classNames = cx({
    /* service */
    button: true,
    button_disabled: isDisabled,
    button_transparent: isTransparent,

    /* text */
    'button-text': true,
    text_white: !isTransparent,
    text_black: isTransparent,
    text_blue_active: isTransparent,

    /* background */
    'gradient-background_blue': isBlue,
    'gradient-background_disabled': isDisabled,
    background_transparent: isTransparent,
  })

  return (
    <ButtonTag
      tagName="button"
      type={type} // eslint-disable-line react/button-has-type
      onClick={onClick}
      disabled={isDisabled}
      className={classNames}
    >
      {isLoading ? (
        <Loader />
      ) : withIcon ? (
        renderWithIcon(children, direction)
      ) : (
        children
      )}
    </ButtonTag>
  )
}
/* eslint-enable no-nested-ternary */

Button.defaultProps = {
  direction: undefined,
  onClick: () => {},
  mode: Modes.blue,
  isLoading: false,
  type: 'button',
  children: '',
  isDisabled: false,
}

Button.propTypes = {
  onClick: T.func,
  isLoading: T.bool,
  isDisabled: T.bool,
  children: T.node,
  mode: T.oneOf(Object.values(Modes)),
  direction: T.oneOf(['left', 'right', 'top', 'bottom']),
  type: T.oneOf(['submit', 'button', 'reset']),
  tag: T.elementType.isRequired,
}

export default withTheme(Button)
