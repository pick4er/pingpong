import React, { useEffect, useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import beautify from 'js-beautify'
import debounce from 'lodash.debounce'

import {
  selectRequest,
  selectResponse,
  requestAction,
  selectIsLoading,
} from 'flux/modules/requests'
import {
  setRequestWidth,
  setResponseWidth,
  selectRequestWidth,
  selectResponseWidth,
} from 'flux/modules/user'
import { MIN_TEXTAREA_WIDTH } from 'dictionary'
import {
  checkIsResponseError,
  initCodeEditor,
  getEditorSize,
  getEditorErrors,
} from 'helpers'
import Tag, { withTheme } from 'elements/ThemeTag'
import Icon from 'elements/Icon'
import Textarea from './Textarea'
import Actions from './Actions'

import './index.scss'

function CodeEditor({
  requestText,
  responseText,
  makeRequest,
  isLoading,
  savedRequestWidth,
  savedResponseWidth,
  saveRequestWidth,
  saveResponseWidth,
  tag: CodeEditorTag,
}) {
  const [requestEditor, setRequestEditor] = useState(null)
  const [responseEditor, setResponseEditor] = useState(null)
  const [isLintError, setIsLintError] = useState(false)

  // INIT FROM LOCAL STORAGE
  useEffect(() => {
    if (requestEditor || responseEditor) {
      return
    }

    const requestTextareaDomEl = document.getElementById(
      'request-textarea'
    )
    const responseTextareaDomEl = document.getElementById(
      'response-textarea'
    )

    if (requestTextareaDomEl && responseTextareaDomEl) {
      initCodeEditor(
        requestTextareaDomEl,
        responseTextareaDomEl,
        savedRequestWidth,
        savedResponseWidth,
        setRequestEditor,
        setResponseEditor
      )
    }
  }, [
    savedRequestWidth,
    savedResponseWidth,
    setRequestEditor,
    setResponseEditor,
    requestEditor,
    responseEditor,
  ])

  // ATTACH ERROR LISTENER
  useEffect(() => {
    if (!requestEditor) {
      return () => {}
    }

    const onChanges = debounce(() => {
      const isNextLintError =
        getEditorErrors(requestEditor).length > 0
      if (isNextLintError === isLintError) {
        return
      }

      setIsLintError(isNextLintError)
    }, 1000)

    requestEditor.on('changes', onChanges)
    return () => {
      requestEditor.off('changes', onChanges)
    }
  }, [requestEditor, setIsLintError, isLintError])

  // RESTORE FROM HISTORY
  useEffect(() => {
    if (!requestEditor) {
      return
    }

    requestEditor.setValue(beautify(requestText))
  }, [requestText, requestEditor])
  useEffect(() => {
    if (!responseEditor) {
      return
    }

    responseEditor.setValue(beautify(responseText))
  }, [responseText, responseEditor])

  // RESIZE ON MOUSE MOVE
  useEffect(() => {
    const dragDomEl = document.getElementById('drag-el')
    const requestTextareaDomEl = document.getElementById(
      'request-textarea'
    )
    const responseTextareaDomEl = document.getElementById(
      'response-textarea'
    )

    const onMouseMove = ($event) => {
      const {
        width: requestWidth,
        wrapDomEl: requestWrapDomEl,
      } = getEditorSize(requestTextareaDomEl)
      const {
        width: responseWidth,
        wrapDomEl: responseWrapDomEl,
      } = getEditorSize(responseTextareaDomEl)

      const prevLeft = dragDomEl.getBoundingClientRect()
        .left
      const shiftX = prevLeft - $event.clientX

      const nextRequestWidth = requestWidth - shiftX
      const nextResponseWidth = responseWidth + shiftX
      if (
        nextRequestWidth < MIN_TEXTAREA_WIDTH ||
        nextResponseWidth < MIN_TEXTAREA_WIDTH
      ) {
        return
      }

      requestWrapDomEl.style.width = `${nextRequestWidth}px`
      responseWrapDomEl.style.width = `${nextResponseWidth}px`
      saveRequestWidth(nextRequestWidth)
      saveResponseWidth(nextResponseWidth)
    }

    const onMouseUp = () => {
      document.body.style.cursor = 'default'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseDown = () => {
      document.body.style.cursor = 'ew-resize'
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    dragDomEl.ondragstart = () => false
    dragDomEl.addEventListener('mousedown', onMouseDown)
    return () => {
      dragDomEl.removeEventListener(
        'mousedown',
        onMouseDown
      )
    }
  }, [saveRequestWidth, saveResponseWidth])

  // RESIZE ON WINDOW RESIZE
  useEffect(() => {
    const paddingOffset = 12 * 2 // right and left
    const borderOffset = (1 + 1) * 2 // right and left for two textareas
    const dragOffset = 10
    const widthOffset =
      paddingOffset + borderOffset + dragOffset

    const requestTextareaDomEl = document.getElementById(
      'request-textarea'
    )
    const responseTextareaDomEl = document.getElementById(
      'response-textarea'
    )

    const onResize = () => {
      const {
        width: requestWidth,
        wrapDomEl: requestWrapDomEl,
      } = getEditorSize(requestTextareaDomEl)
      const {
        width: responseWidth,
        wrapDomEl: responseWrapDomEl,
      } = getEditorSize(responseTextareaDomEl)

      const editorsWidth = window.innerWidth - widthOffset
      const equalWidth = editorsWidth / 2
      const widthDifference =
        (requestWidth - responseWidth) / 2

      const nextRequestWidth = equalWidth + widthDifference
      const nextResponseWidth =
        editorsWidth - nextRequestWidth
      if (
        nextRequestWidth < MIN_TEXTAREA_WIDTH ||
        nextResponseWidth < MIN_TEXTAREA_WIDTH
      ) {
        return
      }

      requestWrapDomEl.style.width = `${nextRequestWidth}px`
      responseWrapDomEl.style.width = `${nextResponseWidth}px`
      saveRequestWidth(nextRequestWidth)
      saveResponseWidth(nextResponseWidth)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [saveRequestWidth, saveResponseWidth])

  const onBeautify = () => {
    requestEditor.setValue(
      beautify(requestEditor.getValue())
    )
  }

  const onRequest = () => {
    if (getEditorErrors(requestEditor).length === 0) {
      makeRequest(JSON.parse(requestEditor.getValue()))
    }
  }

  const isResponseError = checkIsResponseError(responseText)

  return (
    <CodeEditorTag
      tagName="div"
      className="code-editor"
      display="fc"
      bg="bg_white"
    >
      <Tag
        tagName="div"
        display="fr"
        fGrow="grow_1"
        padding="p2_h p3_w"
      >
        <Textarea
          fGrow="grow_1"
          label="Запрос:"
          name="request"
          id="request-textarea"
          isError={isResponseError}
        />
        <div id="drag-el" className="code-editor__drag">
          <Icon iconName="DragIcon" width="w2" />
        </div>
        <Textarea
          fGrow="grow_1"
          label="Ответ:"
          name="response"
          id="response-textarea"
          isError={isResponseError}
        />
      </Tag>
      <Actions
        padding="p3 p2_right"
        isError={isLintError}
        isLoading={isLoading}
        onRequest={onRequest}
        onBeautify={onBeautify}
      />
    </CodeEditorTag>
  )
}

CodeEditor.defaultProps = {
  isLoading: false,
  savedRequestWidth: undefined,
  savedResponseWidth: undefined,
}

CodeEditor.propTypes = {
  requestText: T.string.isRequired,
  responseText: T.string.isRequired,
  makeRequest: T.func.isRequired,
  isLoading: T.bool,
  saveRequestWidth: T.func.isRequired,
  saveResponseWidth: T.func.isRequired,
  savedRequestWidth: T.number,
  savedResponseWidth: T.number,
  tag: T.elementType.isRequired,
}

const mapStateToProps = (state) => ({
  requestText: selectRequest(state),
  responseText: selectResponse(state),
  savedRequestWidth: selectRequestWidth(state),
  savedResponseWidth: selectResponseWidth(state),
  isLoading: selectIsLoading(state),
})

const mapDispatchToProps = (dispatch) => ({
  makeRequest: (requestText) =>
    dispatch(requestAction(requestText)),
  saveRequestWidth: debounce(
    (width) => dispatch(setRequestWidth(width)),
    1000
  ),
  saveResponseWidth: debounce(
    (width) => dispatch(setResponseWidth(width)),
    1000
  ),
})

export default withTheme(
  connect(mapStateToProps, mapDispatchToProps)(CodeEditor)
)
