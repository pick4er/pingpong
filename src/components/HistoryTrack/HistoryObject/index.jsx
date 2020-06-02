import React, { useState } from 'react'
import T from 'prop-types'

import Dropdown from 'elements/Dropdown'
import TileList from './TileList'
import HistoryTile from './HistoryTile'

function HistoryObject(props) {
  const [isOpen, setIsOpen] = useState(false)

  const { request, id, response } = props

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerComponent={() => (
        <HistoryTile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          request={request}
          response={response}
          id={id}
        />
      )}
      listComponent={() => <TileList id={id} setIsOpen={setIsOpen} />}
    />
  )
}

HistoryObject.propTypes = {
  id: T.string.isRequired,
  request: T.shape({}).isRequired,
  response: T.shape({}).isRequired,
}

export default HistoryObject
