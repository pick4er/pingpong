import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Icon from 'elements/Icon'
import { withTheme } from 'elements/ThemeTag'
import { NotificationTypes } from 'dictionary'

import './index.scss'

function Notification({
  notification: { type, title, message },
  withIcon,
  size,
  tag: Tag,
}) {
  const cl = cx({
    fr: true,
    notification: true,
    hide: !type,
    [`notification_size-${size}`]: size,
    [`${type}-background`]: type,
  })
  const titleCl = cx({
    m0: true,
    m1_bottom: true,
    'overflow-ellipsis': true,
    'notification-title-text': true,
    [`${type}-text`]: type,
  })
  const messageCl = cx({
    m0: true,
    'overflow-ellipsis': true,
    'notification-message-text': true,
    [`${type}-text`]: type,
  })

  return (
    <Tag tagName="div" className={cl}>
      {withIcon && (
        <Icon iconName="SadFaceIcon" margin="m2_right" />
      )}
      <div className="fc">
        {title && <h5 className={titleCl}>{title}</h5>}
        {message && <p className={messageCl}>{message}</p>}
      </div>
    </Tag>
  )
}

Notification.defaultProps = {
  withIcon: false,
  notification: {
    type: undefined,
    title: '',
    message: '',
  },
  size: 'l',
}

Notification.propTypes = {
  withIcon: T.bool,
  size: T.oneOf(['s', 'm', 'l']),
  tag: T.elementType.isRequired,
  notification: T.shape({
    type: T.oneOf(Object.values(NotificationTypes)),
    title: T.string,
    message: T.string,
  }),
}

export default withTheme(Notification)
