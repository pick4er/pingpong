import React, { forwardRef } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function CodeEditorTextarea(props) {
  const {
    className,
    label,
    name,
    isError,
    forwardedRef,
  } = props

  const classNames = cx({
    'code-editor__textarea': true,
    'code-editor__textarea_error': isError,
    [className]: className,
  })
  const labelCl = cx({
    'hint-text': true,
    'code-editor__textarea-label': true,
    'hint-text_error': isError,
  })

  return (
    <div className={classNames}>
      {label && <span className={labelCl}>{label}</span>}
      <textarea
        name={name}
        autoComplete="off"
        ref={forwardedRef}
      />
    </div>
  )
}

CodeEditorTextarea.defaultProps = {
  className: '',
  label: '',
  isError: false,
}

CodeEditorTextarea.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  forwardedRef: T.any.isRequired,
  className: T.string,
  label: T.string,
  isError: T.bool,
  name: T.string.isRequired,
}

export default forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <CodeEditorTextarea {...props} forwardedRef={ref} />
))
