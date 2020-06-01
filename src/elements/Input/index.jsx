import React, { useState, useRef, useEffect } from 'react'
import T from 'prop-types'
import cx from 'classnames'

import './index.scss'

const validate = (value, validators, setError, error) => {
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

function Input(props) {
  const inputEl = useRef(null)
  const [error, setError] = useState(undefined)

  const {
    name,
    type,
    label,
    validators,
    isRequired,
    className,
    nativeInputClassName,
  } = props

  useEffect(() => {
    const inputDomEl = inputEl.current
    const formEl = inputDomEl.form

    const onChange = ($event) => validate($event.target.value, validators, setError, error)
    const onSubmit = ($event) => validate($event.target[name].value, validators, setError, error)

    formEl.addEventListener('submit', onSubmit)
    inputDomEl.addEventListener('change', onChange)

    return () => {
      inputDomEl.removeEventListener('change', onChange)
      formEl.removeEventListener('submit', onSubmit)
    }
  }, [error, setError, validators, name])

  const classNames = cx({
    input: true,
    [className]: className,
  })

  const labelNameCl = cx({
    'label-text': true,
    'error-text': error,
  })

  const nativeInputCl = cx({
    'input-text': true,
    border: true,
    border_error: error,
    'native-input': true,
    'native-input__input-text': true,
    [nativeInputClassName]: nativeInputClassName,
  })

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

Input.defaultProps = {
  validators: [],
  isRequired: false,
  className: '',
  nativeInputClassName: '',
}

Input.propTypes = {
  className: T.string,
  isRequired: T.bool,
  nativeInputClassName: T.string,
  validators: T.arrayOf(T.func),
  label: T.string.isRequired,
  name: T.string.isRequired,
  type: T.oneOf(['text', 'password']).isRequired,
}

export default Input
