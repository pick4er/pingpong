import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function CodeEditorTextarea({
  className,
  label,
  name,
  id,
  isError,
}) {
  const classNames = cx([
    'code-editor__textarea',
    isError && 'code-editor__textarea_error',
    className,
  ])
  const labelCl = cx([
    'hint-text',
    'code-editor__textarea-label',
    isError && 'error-text',
  ])

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
