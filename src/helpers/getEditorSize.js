function getEditorSize(editorDomEl) {
  const wrapDomEl = editorDomEl.parentElement
  const editorDomRect = wrapDomEl.getBoundingClientRect()
  const { width } = editorDomRect
  const { height } = editorDomRect

  return {
    width,
    height,
    wrapDomEl,
  }
}

export default getEditorSize
