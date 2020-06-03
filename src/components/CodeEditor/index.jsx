import React, { useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'
import { connect } from 'react-redux'
import CodeMirror from 'codemirror'
import beautify from 'js-beautify'
import jsonlint from 'jsonlint-mod'

import Button from 'elements/Button'
import IconButton from 'elements/IconButton'
import Link from 'elements/Link'
import {
  selectRequest,
  selectResponse,
  requestAction,
  selectIsLoading,
} from 'flux/modules/requests'
import { isResponseError } from 'helpers'
import { MIN_EDITOR_WIDTH } from 'dictionary'
import { ReactComponent as DragIconComponent } from 'assets/drag.svg'
import { ReactComponent as FormatIconComponent } from 'assets/format.svg'

import './index.scss'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/selection/mark-selection'

window.jsonlint = jsonlint

let requestEditor
let responseEditor
function initCodeEditor(requestDomEl, responseDomEl) {
  requestEditor = CodeMirror.fromTextArea(requestDomEl, {
    mode: { name: 'javascript', json: true },
    theme: 'editor',
    lineWrapping: true,
    scrollbarStyle: null,
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
    theme: 'editor-response',
    readOnly: 'nocursor',
    lineWrapping: true,
    scrollbarStyle: null,
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

  const requestWidth = requestWrapDomEl.getBoundingClientRect()
    .width
  const responseWidth = responseWrapDomEl.getBoundingClientRect()
    .width

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
      const shift = prevLeft - $event.clientX

      const nextRequestWidth = requestWidth - shift
      const nextResponseWidth = responseWidth + shift
      if (
        nextRequestWidth < MIN_EDITOR_WIDTH ||
        nextResponseWidth < MIN_EDITOR_WIDTH
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
        nextRequestWidth < MIN_EDITOR_WIDTH ||
        nextResponseWidth < MIN_EDITOR_WIDTH
      ) {
        return
      }

      requestWrapDomEl.style.width = `${nextRequestWidth}px`
      responseWrapDomEl.style.width = `${nextResponseWidth}px`
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
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

  const isError = isResponseError(responseText)

  const classNames = cx({
    'code-editor': true,
    [className]: className,
  })
  const editorWrapCl = cx({
    'code-editor__editor_wrap': true,
    'code-editor__editor_error': isError,
  })
  const editorsCl = cx({
    'code-editor__textareas': true,
  })
  const editorLabelCl = cx({
    'hint-text': true,
    'code-editor__editor-label': true,
    'hint-text_error': isError,
  })
  const actionsCl = cx({
    'code-editor__actions': true,
    'border-separator_top': true,
  })
  const dragIconCl = cx({
    'code-editor__drag-icon': true,
  })

  return (
    <div className={classNames}>
      <div className={editorsCl}>
        <div className={editorWrapCl}>
          <span className={editorLabelCl}>Запрос:</span>
          <textarea
            name="request"
            autoComplete="off"
            ref={requestTextareaEl}
          />
        </div>
        <div ref={dragEl} className="code-editor__drag">
          <DragIconComponent className={dragIconCl} />
        </div>
        <div className={editorWrapCl}>
          <span className={editorLabelCl}>Ответ:</span>
          <textarea
            name="response"
            autoComplete="off"
            ref={responseTextareaEl}
          />
        </div>
      </div>

      <div className={actionsCl}>
        <Button
          mode="blue"
          type="button"
          onClick={onRequest}
          isLoading={isLoading}
          className="code-editor__request-button"
        >
          Отправить
        </Button>

        <Link href="https://github.com/pick4er">
          @pick4er
        </Link>

        <IconButton
          icon={FormatIconComponent}
          type="button"
          onClick={onBeautify}
          mode="transparent"
          direction="left"
        >
          Форматировать
        </IconButton>
      </div>
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
