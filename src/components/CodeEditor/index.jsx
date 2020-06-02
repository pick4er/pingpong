import React, { useRef, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'
import jsonlint from 'jsonlint-mod'

import {
  selectRequest,
  selectResponse,
  requestAction,
} from 'flux/modules/requests'

import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

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
  responseEditor = CodeMirror.fromTextArea(responseEl, {
    mode: {
      name: 'javascript',
      json: true,
    },
    readonly: true,
    lineWrapping: true,
    scrollbarStyle: null,
  })
}

function CodeEditor(props) {
  const requestTextareaEl = useRef(null)
  const responseTextareaEl = useRef(null)

  const { requestText, responseText, makeRequest } = props

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

  return (
    <div className="code-editor_position">
      <div className="CodeEditor--textareas">
        <textarea
          name="request"
          autoComplete="off"
          ref={requestTextareaEl}
        />
        <textarea
          name="response"
          autoComplete="off"
          ref={responseTextareaEl}
        />
      </div>

      <div className="CodeEditor--actions">
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
