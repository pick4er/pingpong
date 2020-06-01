import React from 'react'
import { ReactComponent as LoaderIconComponent } from 'assets/loader.svg'

import './index.scss'

function Loader() {
  return (
    <span className="loader">
      <LoaderIconComponent className="loading-animation" />
    </span>
  )
}

export default Loader
