import React from 'react'

import UserHeader from 'components/UserHeader'
import CodeEditor from 'components/CodeEditor'
import RequestsHistory from 'components/RequestsHistory'

import './index.scss'

function ConsolePage() {
  return (
    <div className="console-page">
      <UserHeader />
      <RequestsHistory />
      <CodeEditor />
    </div>
  )
}

export default ConsolePage
