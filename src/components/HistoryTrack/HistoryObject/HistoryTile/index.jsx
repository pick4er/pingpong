import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import { ReactComponent as SuccessBadgeIcon } from 'assets/successbadge.svg'
import { ReactComponent as ErrorBadgeIcon } from 'assets/errorbadge.svg'
import { ReactComponent as SeparatorIcon } from 'assets/separator.svg'

import { selectCopyNotification } from 'flux/modules/notifications'
import { NotificationTypes } from 'dictionary'
import { getRequestAction, isResponseError } from 'helpers'

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

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="history-tile shadow"
    >
      {isResponseError(response) ? (
        <ErrorBadgeIcon className="history-tile__status_badge" />
      ) : (
        <SuccessBadgeIcon className="history-tile__status_badge" />
      )}
      <div className="request-action-text">
        {getRequestAction(request)}
      </div>
      <SeparatorIcon className="history-tile__separator" />
      {copyNotification.id &&
        copyNotification.id === id && (
          <div>{copyNotification.message}</div>
        )}
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
