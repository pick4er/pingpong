import React, { useRef, useState, useEffect } from 'react'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

let codeMirror
function createCodeMirror(element) {
  codeMirror = CodeMirror.fromTextArea(element, {
    value: 'function abc() {}',
    mode: 'javascript'
  })
}

function ConsolePanel() {
  const editorEl = useRef(null)

  useEffect(() => {
    createCodeMirror(editorEl.current)
  }, [])

  const onBeautify = () => {
    const code = codeMirror.getValue()
    codeMirror.setValue(beautify(code))
  }

  return (
    <div>
      <textarea autoComplete="off" ref={editorEl} />
      <button onClick={onBeautify}>Beautify</button>
    </div>
  )
}

export default ConsolePanel