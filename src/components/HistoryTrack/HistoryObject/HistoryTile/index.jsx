import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import Icon from 'elements/Icon'
import Button from 'elements/Button'
import Notification from 'elements/Notification'

import { NotificationTypes } from 'dictionary'
import {
  getRequestAction,
  checkIsResponseError,
} from 'helpers'
import { selectCopyNotification } from 'flux/modules/notifications'
import { restoreRequestAction } from 'flux/modules/requests'

import './index.scss'

function HistoryTile({
  id,
  isOpen,
  setIsOpen,
  request,
  response,
  copyNotification,
  restoreRequest,
}) {
  const onClick = () => {
    restoreRequest(id)
  }
  const onTileListOpen = () => {
    setIsOpen(!isOpen)
  }

  const isCopyNotification =
    copyNotification.id && copyNotification.id === id

  const requestActionName = getRequestAction(request)
  const classNames = cx([
    'shadow',
    'history-tile',
    isCopyNotification && 'history-tile_fit-notification',
  ])
  const buttonCl = cx([
    'history-tile__button',
    'tile-button_white',
    'tile-button_size-s',
  ])
  const requestTextCl = cx([
    'request-action-text',
    'history-tile__action-text',
    'overflow-ellipsis',
  ])
  const notificationCl = cx([
    'fit-notification-inside',
    'notification-animation_s',
    !isCopyNotification && 'hide',
  ])

  return (
    <div className={classNames}>
      <button
        onClick={onClick}
        className={buttonCl}
        type="button"
      >
        {checkIsResponseError(response) ? (
          <Icon iconName="ErrorBadgeIcon" />
        ) : (
          <Icon iconName="SuccessBadgeIcon" />
        )}
        <div className={requestTextCl}>
          {/* may be `true` */}
          {typeof requestActionName === 'boolean'
            ? '`${нет_действия}`'
            : requestActionName || '`${нет_действия}`'}
        </div>
      </button>
      <Button onClick={onTileListOpen} mode="transparent">
        <Icon iconName="SeparatorIcon" />
      </Button>

      <Notification
        size="s"
        notification={copyNotification}
      />
    </div>
  )
}

HistoryTile.propTypes = {
  id: T.string.isRequired,
  isOpen: T.bool.isRequired,
  setIsOpen: T.func.isRequired,
  request: T.shape({}).isRequired,
  response: T.shape({}).isRequired,
  restoreRequest: T.func.isRequired,
  copyNotification: T.shape({
    id: T.string,
    type: T.oneOf(Object.values(NotificationTypes)),
  }).isRequired,
}

const mapStateToProps = (state) => ({
  copyNotification: selectCopyNotification(state),
})
const mapDispatchToProps = {
  restoreRequest: restoreRequestAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTile)
