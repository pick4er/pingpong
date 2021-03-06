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

const Notification = ({
  notification: { type, title, message },
  withIcon,
  size,
  tag: NotificationTag,
}) => (
  <NotificationTag
    tagName="div"
    display={cx(['fr', !type && 'hide'])}
    className={cx([size && `notification_size-${size}`])}
    bg={`bg_${type}`}
    borderRadius="br3"
  >
    {withIcon && (
      <Icon iconName="SadFaceIcon" margin="m2_right" />
    )}
    <Tag tagName="div" display="fc">
      {title && (
        <Heading
          tagName={headerTags[size]}
          margin="m0 m1_bottom"
          overflow="ellipsis"
          text={headerTags[size]}
          color={`${type}-text`}
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
          color={`${type}-text`}
        >
          {message}
        </Tag>
      )}
    </Tag>
  </NotificationTag>
)

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
