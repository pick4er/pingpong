import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import {
  copyRequestAction,
  deleteRequestAction,
  execRequestAction,
} from 'flux/modules/requests'

function TileList(props) {
  const {
    id,
    execRequest,
    copyRequest,
    deleteRequest,
  } = props

  const onCopy = () => {
    copyRequest(id)
  }

  const onExec = () => {
    execRequest(id)
  }

  const onDelete = () => {
    deleteRequest(id)
  }

  return (
    <ul>
      <li>
        <button onClick={onCopy} type="button">
          Скопировать
        </button>
      </li>

      <li>
        <button onClick={onExec} type="button">
          Выполнить
        </button>
      </li>

      <li>
        <button onClick={onDelete} type="button">
          Удалить
        </button>
      </li>
    </ul>
  )
}

TileList.propTypes = {
  copyRequest: T.func.isRequired,
  id: T.string.isRequired,
  deleteRequest: T.func.isRequired,
  execRequest: T.func.isRequired,
}

const mapDispatchToProps = {
  copyRequest: copyRequestAction,
  deleteRequest: deleteRequestAction,
  execRequest: execRequestAction,
}

export default connect(null, mapDispatchToProps)(TileList)
