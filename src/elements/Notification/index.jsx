import React from 'react';
import T from 'prop-types';
import cx from 'classnames'

import { NotificationTypes } from 'dictionary'
import SadFaceIcon from 'assets/sadFace.svg'

import './index.scss'

const icons = {
  [NotificationTypes.Error]: SadFaceIcon,
}

function Notification(props) {
  const { notification: { type, title, message }, className, withIcon } = props

  const classNames = cx({
    notification: true,
    notification_hide: !type,
    [`notification_${type}`]: !!type,
    [className]: className,
  })

  return (
    <div className={classNames}>
      {withIcon && (
        <img src={icons[type]} alt={`${type}_icon`} />
      )}
      <div className="notification__content">
        {title && (<h5 className={`notification__title notification__title_${type}`}>{title}</h5>)}
        {message && (<p className={`notification__message notification__message_${type}`}>{message}</p>)}
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
  className: '',
}

Notification.propTypes = {
  withIcon: T.bool,
  notification: T.shape({
    type: T.oneOf(Object.values(NotificationTypes)),
    title: T.string,
    message: T.string,
  }),
  className: T.string,
}

export default Notification