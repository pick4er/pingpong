import React, { useState } from 'react'
import T from 'prop-types'

import { getRequestAction } from 'helpers'

function HistoryTile(props) {
  const { request, setIsOpen, id, isOpen } = props

  const onClick = ($event) => {
    setIsOpen(!isOpen)
  }

  return (
    <button onClick={onClick} id={id}>
      {getRequestAction(request)}
    </button>
  )
}

HistoryTile.propTypes = {
  isOpen: T.bool.isRequired,
  request: T.object.isRequired,
  setIsOpen: T.func.isRequired,
  id: T.string.isRequired,
}

export default HistoryTile
