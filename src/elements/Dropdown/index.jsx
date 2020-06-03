import React, { useRef, useEffect, useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { getRandomId } from 'helpers'

import './index.scss'

const MAX_LIST_WIDTH = 500
const MIN_LIST_WIDTH = 130
function computeListStyle(isOpen, triggerDomEl, listDomEl) {
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

  const triggerDomEl = triggerRef.current
  const listDomEl = listRef.current
  const listStyle = computeListStyle(
    isOpen,
    triggerDomEl,
    listDomEl
  )

  const classNames = cx({
    dropdown: true,
    dropdown_relative: isRelative,
  })
  const listCl = cx({
    dropdown__list: true,
  })

  return (
    <div id={`dropdown-${id}`} className={classNames}>
      <div ref={triggerRef}>
        <TriggerComponent />
      </div>

      <div
        ref={listRef}
        role="menu"
        style={listStyle}
        className={listCl}
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
