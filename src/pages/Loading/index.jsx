import React from 'react'
import Loader from 'elements/Loader'

import './index.scss'

function LoadingPage() {
  return (
    <div className="loading-page">
      <Loader size="l" color="black" />
    </div>
  )
}

export default LoadingPage
