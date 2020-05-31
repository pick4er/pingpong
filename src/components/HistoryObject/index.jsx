import React, { useState } from 'react'
import T from 'prop-types'

import Dropdown from 'elements/Dropdown'
import TileList from 'components/TileList'
import HistoryTile from 'components/HistoryTile'

import { getRequestAction } from 'helpers'

function HistoryObject(props) {
  const [isOpen, setIsOpen] = useState(false)

  const { request, id } = props

  return (
    <Dropdown
      isOpen={isOpen}
      triggerComponent={() => (
        <HistoryTile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          request={request}
          id={id}
        />
      )}
      listComponent={() => <TileList id={id} />}
    />
  )
}

HistoryObject.propTypes = {
  id: T.string.isRequired,
  request: T.object.isRequired,
}

export default HistoryObject
