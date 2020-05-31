import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import {
  selectHistory,
  undoRequestAction,
} from 'flux/modules/requests'
import { getRequestAction } from 'helpers'

import './index.scss'

function RequestsHistory(props) {
  const { requestsHistory, undoRequest } = props

  const onClick = ($event) => {
    undoRequest($event.target.id)
  }

  return (
    <ul className="RequestsHistory">
      {requestsHistory.map(({ id, request }) => (
        <li key={id}>
          <button type="button" id={id} onClick={onClick}>
            {getRequestAction(request)}
          </button>
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
  undoRequest: T.func.isRequired,
}

const mapStateToProps = (state) => ({
  requestsHistory: selectHistory(state),
})

const mapDispatchToProps = {
  undoRequest: undoRequestAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsHistory)
