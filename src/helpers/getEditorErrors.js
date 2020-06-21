import CodeMirror from 'codemirror'

function getEditorErrors(editorInstance) {
  editorInstance.performLint()

  const value = editorInstance.getValue()
  return CodeMirror.lint.json(value) || []
}

export default getEditorErrors
