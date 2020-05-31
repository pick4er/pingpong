import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

function Input(props) {
  const inputEl = useRef(null)
  const [error, setError] = useState(undefined)

  const {
    name,
    type,
    label,
    showErrors,
    validators,
    isRequired,
    className,
    nativeInputCl,
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

  useEffect(() => {
    const listener = ($event) =>
      validate($event.target.value)
    inputEl.current.addEventListener('change', listener)
    return () =>
      inputEl.current.removeEventListener(
        'change',
        listener
      )
  }, [])

  const classNames = cx({
    input: true,
    input_outline: true,
    [className]: className,
  })

  const inputClassNames = cx([
    'input__native-input',
    'input__native-input_content',
    nativeInputCl
  ])

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
        ref={inputEl}
        className={inputClassNames}
        autoComplete="off"
        type={type}
        name={name}
        data-error={error}
      />
    </label>
  )
}

Input.defaultProps = {
  validators: [],
  isRequired: false,
  showErrors: false,
  className: '',
  nativeInputCl: '',
}

Input.propTypes = {
  className: T.string,
  isRequired: T.bool,
  nativeInputCl: T.string,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  showErrors: T.bool,
  type: T.oneOf(['text', 'password']).isRequired,
}

export default Input
