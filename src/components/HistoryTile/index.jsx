import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import { selectCopyNotification } from 'flux/modules/notifications'
import { CopyNotifications } from 'dictionary'
import { getRequestAction } from 'helpers'

function getCopyNotificationText(notificationType) {
  if (notificationType === CopyNotifications.Success) {
    return 'Скопировано'
  }

  if (notificationType === CopyNotifications.Fail) {
    return 'Ошибка'
  }

  return undefined
}

function HistoryTile(props) {
  const {
    request,
    setIsOpen,
    id,
    isOpen,
    copyNotification,
  } = props

  const onClick = ($event) => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={onClick} id={id}>
        {getRequestAction(request)}
      </button>
      {copyNotification.id &&
        copyNotification.id === id && (
          <div>
            {getCopyNotificationText(copyNotification.type)}
          </div>
        )}
    </div>
  )
}

HistoryTile.propTypes = {
  isOpen: T.bool.isRequired,
  request: T.object.isRequired,
  setIsOpen: T.func.isRequired,
  id: T.string.isRequired,
  copyNotification: T.shape({
    id: T.string,
    type: T.oneOf(Object.values(CopyNotifications))
      .isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  copyNotification: selectCopyNotification(state),
})

export default connect(mapStateToProps)(HistoryTile)
