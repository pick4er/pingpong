import CodeMirror from 'codemirror'
import jsonlint from 'jsonlint-mod'

import 'codemirror/addon/selection/mark-selection'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'

window.jsonlint = jsonlint

export default function initCodeEditor(
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
