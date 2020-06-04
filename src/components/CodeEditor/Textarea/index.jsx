import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function CodeEditorTextarea(props) {
  const { className, label, name, id, isError } = props

  const classNames = cx({
    'code-editor__textarea': true,
    'code-editor__textarea_error': isError,
    [className]: className,
  })
  const labelCl = cx({
    'hint-text': true,
    'code-editor__textarea-label': true,
    'error-text': isError,
  })

  return (
    <div className={classNames}>
      {label && <span className={labelCl}>{label}</span>}
      <textarea name={name} autoComplete="off" id={id} />
    </div>
  )
}

CodeEditorTextarea.defaultProps = {
  className: '',
  label: '',
  isError: false,
}

CodeEditorTextarea.propTypes = {
  className: T.string,
  label: T.string,
  id: T.string.isRequired,
  isError: T.bool,
  name: T.string.isRequired,
}

export default CodeEditorTextarea
