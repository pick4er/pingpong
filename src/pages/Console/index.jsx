import React from 'react'

import UserHeader from 'components/UserHeader'
import CodeEditor from 'components/CodeEditor'
import HistoryTrack from 'components/HistoryTrack'
import Tag from 'elements/ThemeTag'

import './index.scss'

const ConsolePage = () => (
  <Tag
    tagName="div"
    display="fc"
    bg="bg_main"
    className="console-page"
  >
    <UserHeader />
    <HistoryTrack />
    <CodeEditor fGrow="grow1" />
  </Tag>
)

export default ConsolePage
