import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import {
  copyRequestAction,
  deleteRequestAction,
  execRequestAction,
} from 'flux/modules/requests'

import './index.scss'

function TileList({
  id,
  setIsOpen,
  execRequest,
  copyRequest,
  deleteRequest,
}) {
  const onCopy = () => {
    copyRequest(id)
    setIsOpen(false)
  }

  const onExec = () => {
    execRequest(id)
    setIsOpen(false)
  }

  const onDelete = () => {
    deleteRequest(id)
    setIsOpen(false)
  }

  const classNames = cx([
    'list-styles-reset',
    'tile-list',
    'shadow',
  ])
  const buttonCl = cx([
    'button-styles-reset',
    'tile-list__button',
  ])
  const actionButtonCl = cx([buttonCl, 'list-button'])
  const deleteButtonCl = cx([
    buttonCl,
    'list-button',
    'list-button_error',
  ])

  return (
    <ul className={classNames}>
      <li>
        <button
          onClick={onExec}
          type="button"
          className={actionButtonCl}
        >
          Выполнить
        </button>
      </li>

      <li>
        <button
          onClick={onCopy}
          type="button"
          className={actionButtonCl}
        >
          Скопировать
        </button>
      </li>

      <li>
        <div className="list-separator_middle" />
        <button
          onClick={onDelete}
          type="button"
          className={deleteButtonCl}
        >
          Удалить
        </button>
      </li>
    </ul>
  )
}

TileList.defaultProps = {
  setIsOpen: () => {},
}

TileList.propTypes = {
  setIsOpen: T.func,
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
