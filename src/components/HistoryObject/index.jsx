import React, { useState } from 'react'
import T from 'prop-types'

import Dropdown from 'elements/Dropdown'
import TileList from 'components/TileList'
import HistoryTile from 'components/HistoryTile'

function HistoryObject(props) {
  const [isOpen, setIsOpen] = useState(false)

  const { request, id } = props

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={setIsOpen}
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
  request: T.shape({}).isRequired,
}

export default HistoryObject
