import React from 'react'

import CodeEditor from 'components/CodeEditor'
import RequestsHistory from 'components/RequestsHistory'

function ConsolePage() {
  return (
    <>
      <RequestsHistory />
      <CodeEditor />
    </>
  )
}

export default ConsolePage
