import React from 'react'

import UserHeader from 'components/UserHeader'
import CodeEditor from 'components/CodeEditor'
import HistoryTrack from 'components/HistoryTrack'

import './index.scss'

function ConsolePage() {
  return (
    <div className="console-page">
      <UserHeader />
      <HistoryTrack />
      <CodeEditor />
    </div>
  )
}

export default ConsolePage
