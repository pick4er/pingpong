import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import { selectCopyNotification } from 'flux/modules/notifications'
import { NotificationTypes } from 'dictionary'
import { getRequestAction } from 'helpers'

function HistoryTile(props) {
  const {
    request,
    setIsOpen,
    id,
    isOpen,
    copyNotification,
  } = props

  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={onClick} type="button">
        {getRequestAction(request)}
      </button>
      {copyNotification.id &&
        copyNotification.id === id && (
          <div>
            {copyNotification.message}
          </div>
        )}
    </div>
  )
}

HistoryTile.propTypes = {
  isOpen: T.bool.isRequired,
  request: T.shape({}).isRequired,
  setIsOpen: T.func.isRequired,
  id: T.string.isRequired,
  copyNotification: T.shape({
    id: T.string,
    type: T.oneOf(Object.values(NotificationTypes))
      .isRequired,
  }).isRequired,
}

const mapStateToProps = (state) => ({
  copyNotification: selectCopyNotification(state),
})

export default connect(mapStateToProps)(HistoryTile)
