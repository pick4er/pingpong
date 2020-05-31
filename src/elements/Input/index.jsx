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
    nativeInputCl,
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
    input_outline: true,
    input_error: !!error,
    [className]: className,
  })

  const inputClassNames = cx({
    'input__native-input': true,
    'input__native-input_content': true,
    'input__native-input_error': !!error,
    [nativeInputCl]: nativeInputCl,
  })

  const labelClassName = cx({
    input__label_name: true,
    input__label_name_error: !!error,
  })

  return (
    <label className={classNames} title={error}>
      <div className="input__label">
        <span className={labelClassName}>{label}</span>

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
  type: T.oneOf(['text', 'password']).isRequired,
}

export default Input
