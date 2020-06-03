import React, { useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'
import jsonlint from 'jsonlint-mod'

import {
  selectRequest,
  selectResponse,
  requestAction,
  selectIsLoading,
} from 'flux/modules/requests'
import { isResponseError } from 'helpers'
import {
  MIN_TEXTAREA_WIDTH,
} from 'dictionary'
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

let requestEditor
let responseEditor
function initCodeEditor(requestDomEl, responseDomEl) {
  requestEditor = CodeMirror.fromTextArea(requestDomEl, {
    mode: { name: 'javascript', json: true },
    theme: 'textarea',
    lineWrapping: true,
    autoCloseBrackets: true,
    lint: {
      lintOnChange: false,
      selfContain: true,
    },
    selfContain: false,
  })
  requestEditor.setSize('100%', null)
  // eslint-disable-next-line no-param-reassign
  requestDomEl.parentElement.style.width = '50%'

  responseEditor = CodeMirror.fromTextArea(responseDomEl, {
    mode: {
      name: 'javascript',
      json: true,
    },
    theme: 'textarea',
    readOnly: 'nocursor',
    lineWrapping: true,
    styleSelectedText: true,
  })
  responseEditor.setSize('100%', null)
  // eslint-disable-next-line no-param-reassign
  responseDomEl.parentElement.style.width = '50%'
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

function CodeEditor(props) {
  const dragEl = useRef(null)
  const requestTextareaEl = useRef(null)
  const responseTextareaEl = useRef(null)

  const {
    requestText,
    responseText,
    makeRequest,
    className,
    isLoading,
  } = props

  useEffect(() => {
    initCodeEditor(
      requestTextareaEl.current,
      responseTextareaEl.current
    )
  }, [])

  useEffect(() => {
    requestEditor.setValue(beautify(requestText))
  }, [requestText])

  useEffect(() => {
    responseEditor.setValue(beautify(responseText))
  }, [responseText])

  // MOUSE MOVE
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
  }, [])

  // WINDOW RESIZE
  useEffect(() => {
    const paddingOffset = 12 * 2 // right and left
    const borderOffset = (1 + 1) * 2 // right and left for two editors
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
    requestEditor.performLint()

    const value = requestEditor.getValue()
    const errors = CodeMirror.lint.json(value)
    if (errors.length === 0) {
      makeRequest(JSON.parse(value))
    }
  }

  const isError = isResponseError(responseText)

  const classNames = cx({
    'code-editor': true,
    [className]: className,
  })
  const editorTextareaCl = cx({
    'code-editor__textarea': true,
    'code-editor__editor_error': isError,
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
          isError={isError}
        />
        <div ref={dragEl} className="code-editor__drag">
          <DragIconComponent className={dragIconCl} />
        </div>
        <Textarea
          className={editorTextareaCl}
          ref={responseTextareaEl}
          label="Ответ:"
          name="response"
          isError={isError}
        />
      </div>
      <Actions
        className="code-editor__actions"
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
}

CodeEditor.propTypes = {
  requestText: T.string.isRequired,
  responseText: T.string.isRequired,
  makeRequest: T.func.isRequired,
  isLoading: T.bool,
  className: T.string,
}

const mapStateToProps = (state) => ({
  requestText: selectRequest(state),
  responseText: selectResponse(state),
  isLoading: selectIsLoading(state),
})

const mapDispatchToProps = {
  makeRequest: requestAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor)
