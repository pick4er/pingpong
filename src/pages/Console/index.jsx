import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'

import ConsolePanel from 'components/ConsolePanel'
import { requestAction } from 'flux/modules/requests'

function ConsolePage(props) {
  const { request } = props

  const onSubmit = ($event) => {
    $event.preventDefault()

    try {
      request(JSON.parse($event.target.request.value))
    } catch (e) {
      console.error(e)
    }

    $event.target.reset()
  }

  return (
    <div>
      <ConsolePanel />
    </div>
  )
}

ConsolePage.propTypes = {
  request: T.func.isRequired,
}

const mapDispatchToProps = {
  request: requestAction,
}

export default connect(
  null,
  mapDispatchToProps
)(ConsolePage)
