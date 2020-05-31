import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import Dropdown from 'elements/Dropdown'
import { undoRequestAction } from 'flux/modules/requests'
import { getRequestAction } from 'helpers'

function TileList(props) {
  const { undoRequest, id } = props

  const onCopy = () => {}

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
  undoRequest: T.func.isRequired,
  id: T.string.isRequired,
}

const mapDispatchToProps = {
  undoRequest: undoRequestAction,
}

export default connect(null, mapDispatchToProps)(TileList)
