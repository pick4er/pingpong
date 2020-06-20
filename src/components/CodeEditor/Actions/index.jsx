import React from 'react'
import T from 'prop-types'

import Link from 'elements/Link'
import Button from 'elements/Button'
import IconButton from 'elements/IconButton'
import { withTheme } from 'elements/ThemeTag'
import { ReactComponent as FormatIconComponent } from 'assets/format.svg'

const CodeEditorActions = ({
  isError,
  isLoading,
  onRequest,
  onBeautify,
  tag: CodeEditorActionsTag,
}) => (
  <CodeEditorActionsTag
    tagName="div"
    display="fr"
    separator="sep_top"
    align="center between"
  >
    <Button
      mode="blue"
      type="button"
      isDisabled={isError}
      onClick={onRequest}
      isLoading={isLoading}
      width="w21"
    >
      Отправить
    </Button>

    <Link href="https://github.com/pick4er">@pick4er</Link>

    <IconButton
      icon={FormatIconComponent}
      type="button"
      onClick={onBeautify}
      mode="transparent"
      direction="left"
    >
      Форматировать
    </IconButton>
  </CodeEditorActionsTag>
)

CodeEditorActions.defaultProps = {
  isLoading: false,
  isError: false,
}

CodeEditorActions.propTypes = {
  isLoading: T.bool,
  isError: T.bool,
  onRequest: T.func.isRequired,
  onBeautify: T.func.isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(CodeEditorActions)
