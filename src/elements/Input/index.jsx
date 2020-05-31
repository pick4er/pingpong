import React, { useState } from 'react'
import T from 'prop-types'
import cx from 'classnames'

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
    className,
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

  const classNames = cx({
    input: true,
    [className]: className,
  })

  return (
    <label className={classNames}>
      <div className="input__label">
        <span className="input__label_name">{label}</span>

        {!isRequired && (
          <span className="input__label_optional">
            Опционально
          </span>
        )}
      </div>
      <input
        className="input__native-input input__native-input_content"
        autoComplete="off"
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
  className: '',
}

Input.propTypes = {
  className: T.string,
  isRequired: T.bool,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  showErrors: T.bool,
  type: T.oneOf(['text', 'password']).isRequired,
}

export default Input
