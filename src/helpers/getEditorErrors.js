import CodeMirror from 'codemirror'

export default function getEditorErrors(editorInstance) {
  editorInstance.performLint()

  const value = editorInstance.getValue()
  return CodeMirror.lint.json(value) || []
}
