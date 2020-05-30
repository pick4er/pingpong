import React, { useRef, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'

import {
  selectRequest,
  selectResponse,
  requestAction,
} from 'flux/modules/requests'

import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

let requestEditor
let responseEditor
function initCodeEditor(requestEl, responseEl) {
  requestEditor = CodeMirror.fromTextArea(requestEl, {
    mode: 'javascript',
  })
  responseEditor = CodeMirror.fromTextArea(responseEl, {
    mode: 'javascript',
    readOnly: true,
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
    responseEditor.setValue(beautify(responseText))
  }, [requestText, responseText])

  const onBeautify = () => {
    requestEditor.setValue(
      beautify(requestEditor.getValue())
    )
  }

  const onRequest = () => {
    makeRequest(requestEditor.getValue())
  }

  return (
    <div>
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
