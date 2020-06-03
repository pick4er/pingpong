import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import Notification from 'elements/Notification'
import { NotificationTypes } from 'dictionary'
import { getRequestAction, isResponseError } from 'helpers'
import { selectCopyNotification } from 'flux/modules/notifications'

import { ReactComponent as SuccessBadgeIcon } from 'assets/successbadge.svg'
import { ReactComponent as ErrorBadgeIcon } from 'assets/errorbadge.svg'
import { ReactComponent as SeparatorIcon } from 'assets/separator.svg'

import './index.scss'

function HistoryTile(props) {
  const {
    request,
    response,
    setIsOpen,
    id,
    isOpen,
    copyNotification,
  } = props

  const isCopyNotification =
    copyNotification.id && copyNotification.id === id

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  const classNames = cx({
    shadow: true,
    'history-tile': true,
    'tile-button_white': true,
    'tile-button_size-s': true,
    'history-tile_fit-notification': isCopyNotification,
  })
  const requestTextCl = cx({
    'request-action-text': true,
    'history-tile__action-text': true,
  })

  const notificationCl = cx({
    'history-tile__notification': true,
    'notification-animation_s': true,
    hide: !isCopyNotification,
  })

  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames}
    >
      {isResponseError(response) ? (
        <ErrorBadgeIcon className="history-tile__status_badge" />
      ) : (
        <SuccessBadgeIcon className="history-tile__status_badge" />
      )}
      <div className={requestTextCl}>
        {getRequestAction(request)}
      </div>
      <SeparatorIcon className="history-tile__separator" />
      <Notification
        notification={copyNotification}
        size="s"
        className={notificationCl}
      />
    </button>
  )
}

HistoryTile.propTypes = {
  isOpen: T.bool.isRequired,
  request: T.shape({}).isRequired,
  response: T.shape({}).isRequired,
  setIsOpen: T.func.isRequired,
  id: T.string.isRequired,
  copyNotification: T.shape({
    id: T.string,
    type: T.oneOf(Object.values(NotificationTypes)),
  }).isRequired,
}

const mapStateToProps = (state) => ({
  copyNotification: selectCopyNotification(state),
})

export default connect(mapStateToProps)(HistoryTile)
