import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import { withTheme } from 'elements/ThemeTag'

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
  tag: Tag,
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
    type === 'password' && 'input-text_password',
  ])

  return (
    <Tag tagName="label" className="input" title={error}>
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
    </Tag>
  )
}

FormInput.defaultProps = {
  validators: [],
  isRequired: false,
}

FormInput.propTypes = {
  isRequired: T.bool,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  type: T.oneOf(['text', 'password']).isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(FormInput)
