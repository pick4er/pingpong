import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import { selectHistory } from 'flux/modules/requests'
import HistoryObject from './HistoryObject'

import './index.scss'

function HistoryTrack(props) {
  const { requestsHistory } = props

  const classNames = cx({
    'requests-history': true,
    // for soft transition on delete
    'requests-history_hide': requestsHistory.length === 0,
    'border-separator_bottom': true,
  })

  return (
    <ul className={classNames}>
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
