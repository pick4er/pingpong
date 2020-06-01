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
    validators,
    isRequired,
    className,
    nativeInputClassName,
  } = props

  useEffect(() => {
    const inputDomEl = inputEl.current

    const validate = ($event) => {
      const { value } = $event.target

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

    inputDomEl.addEventListener('change', validate)
    return () =>
      inputDomEl.removeEventListener('change', validate)
  }, [error, setError, validators])

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
    'native-input': true,
    'native-input_error': error,
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
