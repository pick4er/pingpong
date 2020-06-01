import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import { selectHistory } from 'flux/modules/requests'
import HistoryObject from './HistoryObject'

import './index.scss'

function HistoryTrack(props) {
  const { requestsHistory } = props

  return (
    <ul className="requests-history">
      {requestsHistory.map(({ id, request, response }) => (
        <li key={id} className="requests-history__list-item">
          <HistoryObject id={id} request={request} response={response} />
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
