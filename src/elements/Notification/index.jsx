import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Icon from 'elements/Icon'
import Heading from 'elements/Heading'
import Tag, { withTheme } from 'elements/ThemeTag'
import { NotificationTypes } from 'dictionary'

import './index.scss'

const headerTags = {
  m: 'h4',
  s: 'p',
}

function Notification({
  notification: { type, title, message },
  withIcon,
  size,
  tag: NotificationTag,
}) {
  const display = cx([
    'fr',
    !type && 'hide'
  ])
  const headerTagName = headerTags[size]
  const cl = cx({
    notification: true,
    [`notification_size-${size}`]: size,
    [`bg_${type}`]: type,
  })
  const titleCl = cx({
    'notification-title-text': true,
    [`${type}-text`]: type,
  })
  const messageCl = cx({
    'notification-message-text': true,
    [`${type}-text`]: type,
  })

  return (
    <NotificationTag
      tagName="div"
      display={display}
      className={cl}
      borderRadius="br3"
    >
      {withIcon && (
        <Icon iconName="SadFaceIcon" margin="m2_right" />
      )}
      <Tag tagName="div" display="fc">
        {title && (
          <Heading
            tagName={headerTagName}
            margin="m0 m1_bottom"
            overflow="ellipsis"
            text={headerTagName}
            color="error-text"
          >
            {title}
          </Heading>
        )}
        {message && (
          <Tag
            tagName="p"
            margin="m0"
            overflow="ellipsis"
            text="notification-message-text"
            color="error-text"
          >
            {message}
          </Tag>
        )}
      </Tag>
    </NotificationTag>
  )
}

Notification.defaultProps = {
  withIcon: false,
  notification: {
    type: undefined,
    title: '',
    message: '',
  },
  size: 'm',
}

Notification.propTypes = {
  withIcon: T.bool,
  size: T.oneOf(['s', 'm']),
  tag: T.elementType.isRequired,
  notification: T.shape({
    type: T.oneOf(Object.values(NotificationTypes)),
    title: T.string,
    message: T.string,
  }),
}

export default withTheme(Notification)
