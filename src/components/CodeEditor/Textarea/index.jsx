import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Tag, { withTheme } from 'elements/ThemeTag'

import './index.scss'

function CodeEditorTextarea({
  label,
  name,
  id,
  isError,
  tag: CodeEditorTextareaTag,
}) {
  const classNames = cx([
    'code-editor__textarea',
    isError && 'code-editor__textarea_error',
  ])
  const labelCl = cx([
    'hint-text',
    'code-editor__textarea-label',
    isError && 'error-text',
  ])

  return (
    <CodeEditorTextareaTag
      tagName="div"
      className={classNames}
    >
      {label && (
        <Tag tagName="span" className={labelCl}>
          {label}
        </Tag>
      )}
      <textarea name={name} autoComplete="off" id={id} />
    </CodeEditorTextareaTag>
  )
}

CodeEditorTextarea.defaultProps = {
  label: '',
  isError: false,
}

CodeEditorTextarea.propTypes = {
  label: T.string,
  id: T.string.isRequired,
  isError: T.bool,
  name: T.string.isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(CodeEditorTextarea)
