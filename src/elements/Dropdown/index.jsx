import React, { useRef, useEffect, useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { getRandomId } from 'helpers'

import './index.scss'

function computeListStyle(isOpen, triggerEl) {
  if (isOpen && triggerEl) {
    const coords = triggerEl.getBoundingClientRect()

    return {
      top: coords.bottom,
      left: coords.left
    }
  }

  return {
    display: 'none',
  }
}

function Dropdown(props) {
  const [id] = useState(getRandomId())
  const triggerRef = useRef(null)
  const listRef = useRef(null)

  const {
    triggerComponent: TriggerComponent,
    listComponent: ListComponent,
    setIsOpen,
    isOpen,
    isRelative,
  } = props

  useEffect(() => {
    const clickListener = ($event) => {
      if ($event.target.closest(`#dropdown-${id}`)) {
        return
      }

      if (isOpen) {
        setIsOpen(false)
      }
    }

    const wheelListener = ($event) => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('wheel', wheelListener)
    document.addEventListener('click', clickListener)
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('wheel', wheelListener)
    }
  }, [setIsOpen, isOpen, id])

  const triggerDomEl = triggerRef.current
  const listStyle = computeListStyle(isOpen, triggerDomEl)

  const classNames = cx({
    'dropdown': true,
    'dropdown__relative': isRelative
  })

  return (
    <div id={`dropdown-${id}`} className="dropdown">
      <div ref={triggerRef}>
        <TriggerComponent />
      </div>

      <div
        ref={listRef}
        role="menu"
        style={listStyle}
        className="dropdown__list"
      >
        <ListComponent />
      </div>
    </div>
  )
}

Dropdown.defaultProps = {
  isRelative: true
}

Dropdown.propTypes = {
  isRelative: T.bool,
  triggerComponent: T.elementType.isRequired,
  listComponent: T.elementType.isRequired,
  isOpen: T.bool.isRequired,
  setIsOpen: T.func.isRequired,
}

export default Dropdown
