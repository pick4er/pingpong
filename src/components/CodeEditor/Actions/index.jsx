import React from 'react'
import T from 'prop-types'
import cx from 'classnames'

import Link from 'elements/Link'
import Button from 'elements/Button'
import IconButton from 'elements/IconButton'
import { ReactComponent as FormatIconComponent } from 'assets/format.svg'

import './index.scss'

function CodeEditorActions(props) {
  const {
    isError,
    isLoading,
    onRequest,
    onBeautify,
    className,
  } = props

  const classNames = cx({
    'code-editor__actions': true,
    'border-separator_top': true,
    [className]: className,
  })

  return (
    <div className={classNames}>
      <Button
        mode="blue"
        type="button"
        isDisabled={isError}
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
  )
}

CodeEditorActions.defaultProps = {
  className: '',
  isLoading: false,
  isError: false,
}

CodeEditorActions.propTypes = {
  className: T.string,
  isLoading: T.bool,
  isError: T.bool,
  onRequest: T.func.isRequired,
  onBeautify: T.func.isRequired,
}

export default CodeEditorActions
