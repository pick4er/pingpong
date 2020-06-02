import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import IconButton from 'elements/IconButton'
import HistoryObject from './HistoryObject'
import { selectHistory } from 'flux/modules/requests'
import { ReactComponent as CrossIconComponent } from 'assets/cross.svg'

import './index.scss'

function HistoryTrack(props) {
  const { requestsHistory } = props

  const isRequestsHistory = requestsHistory.length > 0


  const classNames = cx({
    'requests-history': true,
    'requests-history_increase-stack': true,
    // for soft transition on delete
    'requests-history_hide': !isRequestsHistory,
    'border-separator_bottom': isRequestsHistory,
  })
  const listCl = cx({
    'list-styles-reset': true,
    'requests-history__list': true,
  })
  const removeItemCl = cx({
    'history-track__remove-list-item': true,
    'border-separator_left': true,
  })

  return (
    <div className={classNames}>
      <ul className={listCl}>
        {requestsHistory.map(({ id, request, response }) => (
          <li
            key={id}
            className="requests-history__list-item"
          >
            <HistoryObject
              id={id}
              request={request}
              response={response}
            />
          </li>
        ))}
      </ul>

      <div className={removeItemCl}>
        <IconButton icon={CrossIconComponent} mode="transparent" direction="right" />
      </div>
    </div>
  )
}

HistoryTrack.propTypes = {
  requestsHistory: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      request: T.object.isRequired,
      response: T.object.isRequired,
    })
  ).isRequired,
}

const mapStateToProps = (state) => ({
  requestsHistory: selectHistory(state),
})

export default connect(mapStateToProps)(HistoryTrack)
