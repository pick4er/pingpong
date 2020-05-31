import React, { useRef } from 'react'
import T from 'prop-types'
import cx from 'classnames'

function computeListStyle(isActive) {
  if (isActive) {
    return {}
  }

  return {
    visibility: 'hidden'
  }
}

function Dropdown(props) {
  const triggerRef = useRef(null)
  const listRef = useRef(null)

  const { triggerComponent: TriggerComponent, listComponent: ListComponent, isActive } = props

  const listStyle = computeListStyle(isActive)

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
  triggerComponent: T.node.isRequired,
  listComponent: T.node.isRequired,
  isOpen: T.bool.isRequired,
}

export default Dropdown