import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import Dropdown from 'elements/Dropdown'
import {
  copyRequestAction,
  deleteRequestAction,
  execRequestAction,
} from 'flux/modules/requests'
import { getRequestAction } from 'helpers'

function TileList(props) {
  const {
    copyRequest,
    id,
    deleteRequest,
    execRequest,
  } = props

  const onCopy = () => {
    copyRequest(id)
  }

  const onExec = () => {}

  const onDelete = () => {}

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
