import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import { NotificationTypes } from 'dictionary'
import SadFaceIcon from 'assets/sadFace.svg'

import './index.scss'

const icons = {
  [NotificationTypes.Error]: SadFaceIcon,
}

function Notification(props) {
  const {
    notification: { type, title, message },
    className,
    withIcon,
    size,
  } = props

  const classNames = cx({
    notification: true,
    hide: !type,
    [`notification_size-${size}`]: size,
    [`${type}-background`]: type,
    [className]: className,
  })
  const titleCl = cx({
    notification__title: true,
    'notification-title-text': true,
    [`${type}-text`]: type,
  })
  const messageCl = cx({
    notification__message: true,
    'notification-message-text': true,
    [`${type}-text`]: type,
  })

  return (
    <div className={classNames}>
      {withIcon && (
        <img
          className="notification__icon"
          src={icons[type]}
          alt={`${type}_icon`}
        />
      )}
      <div className="notification__content">
        {title && <h5 className={titleCl}>{title}</h5>}
        {message && <p className={messageCl}>{message}</p>}
      </div>
    </div>
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
  className: '',
}

Notification.propTypes = {
  withIcon: T.bool,
  size: T.oneOf(['s', 'm', 'l']),
  notification: T.shape({
    type: T.oneOf(Object.values(NotificationTypes)),
    title: T.string,
    message: T.string,
  }),
  className: T.string,
}

export default Notification
