import React, { useState } from 'react'
import T from 'prop-types'

import './index.scss'

function Input(props) {
  const [error, setError] = useState(undefined)
  const [value, setValue] = useState('')

  const {
    name,
    type,
    label,
    showErrors,
    validators,
    isRequired,
  } = props

  const validate = (value) => {
    let nextError
    validators.find(
      (validator) => (nextError = validator(value))
    )

    if (nextError) {
      setError(nextError)
    } else if (error && !nextError) {
      setError(undefined)
    }
  }

  const onChange = ($event) => {
    const { value } = $event.target
    setValue(value)
    validate(value)
  }

  return (
    <label htmlFor={name}>
      {label}
      <input
        required={isRequired}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        data-error={error}
      />
      {error && showErrors && <span>{error}</span>}
    </label>
  )
}

Input.defaultProps = {
  validators: [],
  isRequired: false,
  showErrors: false,
}

Input.propTypes = {
  isRequired: T.bool,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  showErrors: T.bool,
  type: T.oneOf(['text', 'password']).isRequired,
}

export default Input
