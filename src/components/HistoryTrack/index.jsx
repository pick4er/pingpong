import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'

import Tag from 'elements/ThemeTag'
import IconButton from 'elements/IconButton'
import {
  selectHistory,
  removeHistoryAction,
  selectIdToChange,
} from 'flux/modules/requests'
import { ReactComponent as CrossIconComponent } from 'assets/cross.svg'
import HistoryObject from './HistoryObject'

import './index.scss'

function HistoryTrack({
  requestsHistory,
  removeHistory,
  idToChange,
}) {
  useEffect(() => {
    const listDomEl = document.getElementById('track-list')

    const onMouseWheel = ($event) => {
      listDomEl.scrollLeft += $event.deltaY
    }

    listDomEl.addEventListener('wheel', onMouseWheel)
    return () => {
      listDomEl.removeEventListener('wheel', onMouseWheel)
    }
  }, [])

  const isRequestsHistory = requestsHistory.length > 0
  const cl = cx({
    'history-track': true,
    'history-track_increase-stack': true,
    // for soft transition on delete
    'history-track_hide': !isRequestsHistory,
  })
  const listCl = cx({
    'list-styles-reset': true,
    'history-track__list': true,
  })
  const removeHistoryCl = cx({
    'history-track__remove-list-item': true,
    'border-shadow_grey_left': true,
  })

  return (
    <Tag
      tagName="div"
      separator={cx([isRequestsHistory && 'sep_bottom'])}
      className={cl}
    >
      <ul className={listCl} id="track-list">
        {requestsHistory.map(
          ({ id, request, response }) => {
            const shouldDelete = idToChange === id

            const listItemCl = cx([
              'history-track__list-item',
              shouldDelete && [
                'history-track__list-item_delete',
                'tile-animation_left',
                'animation_instant',
              ],
            ])

            return (
              <li key={id} className={listItemCl}>
                <HistoryObject
                  id={id}
                  request={request}
                  response={response}
                />
              </li>
            )
          }
        )}
      </ul>

      <Tag
        tagName="div"
        separator="sep_left"
        className={removeHistoryCl}
      >
        <IconButton
          onClick={removeHistory}
          icon={CrossIconComponent}
          mode="transparent"
          direction="right"
        />
      </Tag>
    </Tag>
  )
}

HistoryTrack.defaultProps = {
  idToChange: '',
}

HistoryTrack.propTypes = {
  idToChange: T.string,
  requestsHistory: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      request: T.object.isRequired,
      response: T.object.isRequired,
    })
  ).isRequired,
  removeHistory: T.func.isRequired,
}

const mapDispatchToProps = {
  removeHistory: removeHistoryAction,
}

const mapStateToProps = (state) => ({
  requestsHistory: selectHistory(state),
  idToChange: selectIdToChange(state),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryTrack)
