import React, { useRef, useEffect, useState } from 'react'
import T from 'prop-types'

import { nanoid } from 'helpers'

function computeListStyle(isOpen) {
  if (isOpen) {
    return {}
  }

  return {
    visibility: 'hidden',
  }
}

function Dropdown(props) {
  const [id] = useState(nanoid())
  const triggerRef = useRef(null)
  const listRef = useRef(null)

  const {
    triggerComponent: TriggerComponent,
    listComponent: ListComponent,
    setIsOpen,
    isOpen,
  } = props

  useEffect(() => {
    const listener = ($event) => {
      if ($event.target.closest(`#dropdown-${id}`)) {
        return
      }

      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', listener)
    return () =>
      document.removeEventListener('click', listener)
  }, [setIsOpen, isOpen, id])

  const listStyle = computeListStyle(isOpen)

  return (
    <div id={`dropdown-${id}`}>
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
  setIsOpen: T.func.isRequired,
}

export default Dropdown
