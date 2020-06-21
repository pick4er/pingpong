import React from 'react'

import Loader from 'elements/Loader'
import Tag from 'elements/ThemeTag'

const LoadingPage = () => (
  <Tag tagName="div" className="page">
    <Loader size="l" color="black" />
  </Tag>
)

export default LoadingPage
