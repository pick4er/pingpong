import React, { useRef } from 'react'
import T from 'prop-types'

function computeListStyle(isOpen) {
  if (isOpen) {
    return {}
  }

  return {
    visibility: 'hidden',
  }
}

function Dropdown(props) {
  const triggerRef = useRef(null)
  const listRef = useRef(null)

  const {
    triggerComponent: TriggerComponent,
    listComponent: ListComponent,
    isOpen,
  } = props

  const listStyle = computeListStyle(isOpen)

  return (
    <div>
      <div ref={triggerRef}>
        <TriggerComponent />
      </div>

      <div ref={listRef} role="menu" style={listStyle}>
        <ListComponent />
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  triggerComponent: T.elementType.isRequired,
  listComponent: T.elementType.isRequired,
  isOpen: T.bool.isRequired,
}

export default Dropdown
