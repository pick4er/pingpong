import React, { useRef, useEffect, useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'
import jsonlint from 'jsonlint-mod'
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
import { checkIsResponseError } from 'helpers'
import { MIN_TEXTAREA_WIDTH } from 'dictionary'
import { ReactComponent as DragIconComponent } from 'assets/drag.svg'
import Textarea from './Textarea'
import Actions from './Actions'

import './index.scss'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/selection/mark-selection'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'

window.jsonlint = jsonlint

function initCodeEditor(
  requestDomEl,
  responseDomEl,
  requestWidth,
  responseWidth,
  setRequestEditor,
  setResponseEditor
) {
  const requestEditor = CodeMirror.fromTextArea(
    requestDomEl,
    {
      mode: { name: 'javascript', json: true },
      theme: 'textarea',
      lineWrapping: true,
      autoCloseBrackets: true,
      lint: {
        lintOnChange: true,
        selfContain: false,
      },
      selfContain: false,
    }
  )
  requestEditor.setSize('100%', null)
  // eslint-disable-next-line no-param-reassign
  requestDomEl.parentElement.style.width =
    typeof requestWidth === 'number'
      ? `${requestWidth}px`
      : requestWidth

  const responseEditor = CodeMirror.fromTextArea(
    responseDomEl,
    {
      mode: {
        name: 'javascript',
        json: true,
      },
      theme: 'textarea',
      readOnly: 'nocursor',
      lineWrapping: true,
      styleSelectedText: true,
    }
  )
  responseEditor.setSize('100%', null)
  // eslint-disable-next-line no-param-reassign
  responseDomEl.parentElement.style.width =
    typeof responseWidth === 'number'
      ? `${responseWidth}px`
      : responseWidth

  setRequestEditor(requestEditor)
  setResponseEditor(responseEditor)
}

function getEditorsSizes(
  requestTextareaEl,
  responseTextareaEl
) {
  const requestTextareaDomEl = requestTextareaEl.current
  const responseTextareaDomEl = responseTextareaEl.current

  const requestWrapDomEl =
    requestTextareaDomEl.parentElement

  const responseWrapDomEl =
    responseTextareaDomEl.parentElement

  const requestRect = requestWrapDomEl.getBoundingClientRect()
  const requestWidth = requestRect.width

  const responseRect = responseWrapDomEl.getBoundingClientRect()
  const responseWidth = responseRect.width

  return {
    requestWidth,
    responseWidth,
    requestWrapDomEl,
    responseWrapDomEl,
  }
}

function getEditorErrors(editorInstance) {
  editorInstance.performLint()

  const value = editorInstance.getValue()
  return CodeMirror.lint.json(value) || []
}

function CodeEditor(props) {
  const dragEl = useRef(null)
  const requestTextareaEl = useRef(null)
  const responseTextareaEl = useRef(null)

  const [requestEditor, setRequestEditor] = useState(null)
  const [responseEditor, setResponseEditor] = useState(null)
  const [isLintError, setIsLintError] = useState(false)

  const {
    requestText,
    responseText,
    makeRequest,
    className,
    isLoading,
    savedRequestWidth,
    savedResponseWidth,
    saveRequestWidth,
    saveResponseWidth,
  } = props

  // INIT
  useEffect(() => {
    if (requestEditor || responseEditor) {
      return
    }

    initCodeEditor(
      requestTextareaEl.current,
      responseTextareaEl.current,
      savedRequestWidth,
      savedResponseWidth,
      setRequestEditor,
      setResponseEditor
    )
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
    const dragDomEl = dragEl.current

    const onMouseMove = ($event) => {
      const {
        requestWidth,
        responseWidth,
        requestWrapDomEl,
        responseWrapDomEl,
      } = getEditorsSizes(
        requestTextareaEl,
        responseTextareaEl
      )

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

    const onResize = () => {
      const {
        requestWidth,
        responseWidth,
        requestWrapDomEl,
        responseWrapDomEl,
      } = getEditorsSizes(
        requestTextareaEl,
        responseTextareaEl
      )

      const editorsWidth = window.innerWidth - widthOffset
      const equalWidth = editorsWidth / 2
      const widthDifference =
        (requestWidth - responseWidth) / 2

      const nextRequestWidth = equalWidth + widthDifference
      const nextResponseWidth =
        editorsWidth - nextRequestWidth
      if (
        nextRequestWidth > MIN_TEXTAREA_WIDTH &&
        nextResponseWidth > MIN_TEXTAREA_WIDTH
      ) {
        requestWrapDomEl.style.width = `${nextRequestWidth}px`
        responseWrapDomEl.style.width = `${nextResponseWidth}px`
        setRequestWidth(nextResponseWidth)
        setResponseWidth(nextResponseWidth)
      }
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

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

  const classNames = cx({
    'code-editor': true,
    [className]: className,
  })
  const editorTextareaCl = cx({
    'code-editor__textarea': true,
    'code-editor__editor_error': isResponseError,
  })
  const dragIconCl = cx({
    'code-editor__drag-icon': true,
  })

  return (
    <div className={classNames}>
      <div className="code-editor__textareas">
        <Textarea
          className={editorTextareaCl}
          ref={requestTextareaEl}
          label="Запрос:"
          name="request"
          isError={isResponseError}
        />
        <div ref={dragEl} className="code-editor__drag">
          <DragIconComponent className={dragIconCl} />
        </div>
        <Textarea
          className={editorTextareaCl}
          ref={responseTextareaEl}
          label="Ответ:"
          name="response"
          isError={isResponseError}
        />
      </div>
      <Actions
        className="code-editor__actions"
        isError={isLintError}
        isLoading={isLoading}
        onRequest={onRequest}
        onBeautify={onBeautify}
      />
    </div>
  )
}

CodeEditor.defaultProps = {
  className: '',
  isLoading: false,
  savedRequestWidth: '50%',
  savedResponseWidth: '50%',
}

CodeEditor.propTypes = {
  requestText: T.string.isRequired,
  responseText: T.string.isRequired,
  makeRequest: T.func.isRequired,
  isLoading: T.bool,
  className: T.string,
  saveRequestWidth: T.func.isRequired,
  saveResponseWidth: T.func.isRequired,
  savedRequestWidth: T.number,
  savedResponseWidth: T.number,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor)
