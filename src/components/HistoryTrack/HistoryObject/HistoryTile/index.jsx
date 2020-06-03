import React from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'

import IconButton from 'elements/IconButton'
import Notification from 'elements/Notification'
import { NotificationTypes } from 'dictionary'
import {
  getRequestAction,
  checkIsResponseError,
} from 'helpers'
import { selectCopyNotification } from 'flux/modules/notifications'
import { restoreRequestAction } from 'flux/modules/requests'

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
    restoreRequest,
  } = props

  const isCopyNotification =
    copyNotification.id && copyNotification.id === id

  const onClick = () => {
    restoreRequest(id)
  }
  const onTileListOpen = () => {
    setIsOpen(!isOpen)
  }

  const classNames = cx({
    shadow: true,
    'history-tile': true,
    'history-tile_fit-notification': isCopyNotification,
  })
  const buttonCl = cx({
    'history-tile__button': true,
    'tile-button_white': true,
    'tile-button_size-s': true,
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
    <div className={classNames}>
      <button
        onClick={onClick}
        className={buttonCl}
        type="button"
      >
        {checkIsResponseError(response) ? (
          <ErrorBadgeIcon className="history-tile__status_badge" />
        ) : (
          <SuccessBadgeIcon className="history-tile__status_badge" />
        )}
        <div className={requestTextCl}>
          {/* eslint-disable-next-line no-template-curly-in-string */}
          {getRequestAction(request) || '`${нет_действия}`'}
        </div>
      </button>
      <IconButton
        withOutline={false}
        icon={SeparatorIcon}
        onClick={onTileListOpen}
        mode="transparent"
        className="history-tile__list-toggler"
      />
      <Notification
        notification={copyNotification}
        size="s"
        className={notificationCl}
      />
    </div>
  )
}

HistoryTile.propTypes = {
  isOpen: T.bool.isRequired,
  request: T.shape({}).isRequired,
  response: T.shape({}).isRequired,
  setIsOpen: T.func.isRequired,
  id: T.string.isRequired,
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
