import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

const validate = (value, validators, setError, error) => {
  let nextError
  validators.find((validator) => {
    nextError = validator(value)
    return !!nextError
  })

  if (nextError) {
    setError(nextError)
  } else if (error && !nextError) {
    setError(undefined)
  }
}

function FormInput({
  name,
  type,
  label,
  validators,
  isRequired,
  className,
  nativeInputClassName,
}) {
  const inputEl = useRef(null)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    const inputDomEl = inputEl.current
    const formEl = inputDomEl.form

    const onChange = ($event) =>
      validate(
        $event.target.value,
        validators,
        setError,
        error
      )
    const onSubmit = ($event) =>
      validate(
        $event.target[name].value,
        validators,
        setError,
        error
      )

    formEl.addEventListener('submit', onSubmit)
    inputDomEl.addEventListener('change', onChange)

    return () => {
      inputDomEl.removeEventListener('change', onChange)
      formEl.removeEventListener('submit', onSubmit)
    }
  }, [error, setError, validators, name])

  const classNames = cx(['input', className])

  const labelNameCl = cx([
    'label-text',
    error && 'error-text',
  ])

  const nativeInputCl = cx([
    'input-text',
    'border',
    'native-input',
    'native-input__input-text',
    error && 'border_error',
    nativeInputClassName,
  ])

  return (
    <label className={classNames} title={error}>
      <div className="input-label input__input-label">
        <span className={labelNameCl}>{label}</span>

        {!isRequired && (
          <span className="hint-text input-label__hint">
            Опционально
          </span>
        )}
      </div>
      <input
        ref={inputEl}
        className={nativeInputCl}
        autoComplete="off"
        type={type}
        name={name}
        data-error={error}
      />
    </label>
  )
}

FormInput.defaultProps = {
  validators: [],
  isRequired: false,
  className: '',
  nativeInputClassName: '',
}

FormInput.propTypes = {
  className: T.string,
  isRequired: T.bool,
  nativeInputClassName: T.string,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  type: T.oneOf(['text', 'password']).isRequired,
}

export default FormInput
