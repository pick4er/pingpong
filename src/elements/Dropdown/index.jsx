import React, { useRef, useEffect, useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import { getRandomId } from 'helpers'
import { MAX_LIST_WIDTH, MIN_LIST_WIDTH } from 'dictionary'

import './index.scss'

function computeListStyle(isOpen, triggerDomEl) {
  if (isOpen && triggerDomEl) {
    const triggerCoords = triggerDomEl.getBoundingClientRect()
    const triggerWidth = triggerDomEl.getBoundingClientRect()
      .width
    const { clientWidth } = document.body

    let listWidth = triggerWidth
    if (triggerWidth > MAX_LIST_WIDTH) {
      listWidth = MAX_LIST_WIDTH
    } else if (triggerWidth < MIN_LIST_WIDTH) {
      listWidth = MIN_LIST_WIDTH
    }

    const top = triggerCoords.bottom
    let { left } = triggerCoords
    let zIndex = 0
    if (triggerCoords.left + listWidth > clientWidth) {
      const shift =
        triggerCoords.left + listWidth - clientWidth
      left = triggerCoords.left - shift - 10 // the last is little padding
      zIndex = 3 // to be above delete icon
    }

    return {
      top,
      left,
      zIndex,
      width: listWidth,
    }
  }

  return {
    display: 'none',
  }
}

function Dropdown({
  triggerComponent: TriggerComponent,
  listComponent: ListComponent,
  setIsOpen,
  isOpen,
  isRelative,
}) {
  const [id] = useState(getRandomId())
  const triggerRef = useRef(null)

  useEffect(() => {
    const clickListener = ($event) => {
      if ($event.target.closest(`#dropdown-${id}`)) {
        return
      }

      if (isOpen) {
        setIsOpen(false)
      }
    }

    const wheelListener = () => {
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

  const listStyle = computeListStyle(
    isOpen,
    triggerRef.current
  )

  const cl = cx([isRelative && 'dropdown_relative'])

  return (
    <div id={`dropdown-${id}`} className={cl}>
      <div ref={triggerRef}>
        <TriggerComponent />
      </div>

      <div
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
  isRelative: true,
}

Dropdown.propTypes = {
  isRelative: T.bool,
  triggerComponent: T.elementType.isRequired,
  listComponent: T.elementType.isRequired,
  isOpen: T.bool.isRequired,
  setIsOpen: T.func.isRequired,
}

export default Dropdown
