import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import HistoryObject from 'components/HistoryObject'
import { selectHistory } from 'flux/modules/requests'

import './index.scss'

function RequestsHistory(props) {
  const { requestsHistory } = props

  return (
    <ul className="RequestsHistory">
      {requestsHistory.map(({ id, request }) => (
        <li key={id}>
          <HistoryObject id={id} request={request} />
        </li>
      ))}
    </ul>
  )
}

RequestsHistory.propTypes = {
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

export default connect(mapStateToProps)(RequestsHistory)
