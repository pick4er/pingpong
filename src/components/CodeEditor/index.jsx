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
} from 'flux/modules/requests'
import { ReactComponent as DragIconComponent } from 'assets/separator.svg'

import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/selection/mark-selection.js'

window.jsonlint = jsonlint

let requestEditor
let responseEditor
function initCodeEditor(requestEl, responseEl) {
  requestEditor = CodeMirror.fromTextArea(requestEl, {
    mode: { name: 'javascript', json: true },
    lineWrapping: true,
    scrollbarStyle: null,
    autoCloseBrackets: true,
    lint: {
      lintOnChange: false,
      selfContain: true,
    },
    selfContain: false,
  })
  requestEditor.setSize('50%', null)

  responseEditor = CodeMirror.fromTextArea(responseEl, {
    mode: {
      name: 'javascript',
      json: true,
    },
    readOnly: true,
    lineWrapping: true,
    scrollbarStyle: null,
    styleSelectedText: true,
  })
  responseEditor.setSize('50%', null)
}

function CodeEditor(props) {
  const dragEl = useRef(null)
  const requestTextareaEl = useRef(null)
  const responseTextareaEl = useRef(null)

  const { requestText, responseText, makeRequest } = props

  useEffect(() => {
    const dragDomEl = dragEl.current

    const requestTextareaDomEl = requestTextareaEl.current
    const responseTextareaDomEl = responseTextareaEl.current

    const onMouseMove = ($event) => {
      const requestEditorDomEl = requestTextareaDomEl.nextElementSibling
      const responseEditorDomEl = responseTextareaDomEl.nextElementSibling

      const requestWidth = requestEditorDomEl.getBoundingClientRect().width
      const responseWidth = responseEditorDomEl.getBoundingClientRect().width

      const prevLeft = dragDomEl.getBoundingClientRect().left
      const shift = prevLeft - $event.clientX

      const nextRequestWidth = requestWidth - shift
      requestEditor.setSize(nextRequestWidth, null)

      const nextResponseWidth = responseWidth + shift
      responseEditor.setSize(nextResponseWidth, null)
    }

    const onMouseDown = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    dragDomEl.ondragstart = () => false
    dragDomEl.addEventListener('mousedown', onMouseDown)
    return () => {
      dragDomEl.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

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

  const editorsCl = cx({
    'code-editor__textareas': true,
  })
  const actionsCl = cx({
    'code-editor__actions': true
  })

  return (
    <div className="code-editor">
      <div className={editorsCl}>
        <textarea
          name="request"
          autoComplete="off"
          ref={requestTextareaEl}
        />
        <div ref={dragEl} className="code-editor__separator">
          <DragIconComponent className="code-editor__separator-icon" />
        </div>
        <textarea
          name="response"
          autoComplete="off"
          ref={responseTextareaEl}
        />
      </div>

      <div className={actionsCl}>
        <button type="button" onClick={onRequest}>
          Request
        </button>
        <button type="button" onClick={onBeautify}>
          Beautify
        </button>
      </div>
    </div>
  )
}

CodeEditor.propTypes = {
  requestText: T.string.isRequired,
  responseText: T.string.isRequired,
  makeRequest: T.func.isRequired,
}

const mapStateToProps = (state) => ({
  requestText: selectRequest(state),
  responseText: selectResponse(state),
})

const mapDispatchToProps = {
  makeRequest: requestAction,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditor)
