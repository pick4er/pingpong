import pluralizeWord from './pluralizeWord'

export function validateValues(values, validators) {
  return Object.keys(values).reduce((errors, fieldName) => {
    const fieldValue = values[fieldName]
    const fieldErrors = validators[fieldName]
      .map((validate) => validate(fieldValue))
      .filter((error) => typeof error === 'string')

    return {
      ...errors,
      [fieldName]: fieldErrors,
    }
  }, {})
}

export function required(value) {
  if (typeof value === 'undefined' || value === '') {
    return 'Заполните, пожалуйста, поле'
  }

  return undefined
}

export function latinOnly(value) {
  if (typeof value === 'undefined' || value === '') {
    return undefined
  }

  const latinRegExp = /[^\u0020-\u00ff]/
  if (latinRegExp.test(value)) {
    return 'Поле принимает только латинские символы'
  }

  return undefined
}

export function emailOrLogin(value) {
  if (
    typeof value === 'undefined' ||
    value === 'undefined'
  ) {
    return undefined
  }

  const emailRegExp = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i
  const loginRegExp = /^\w+$/i

  if (loginRegExp.test(value)) {
    return undefined
  }

  if (emailRegExp.test(value)) {
    return undefined
  }

  return 'Введите, пожалуйста, корректный логин'
}

export function startsWithLetter(value) {
  const firstLetterRegExp = /^[a-z]/i
  if (typeof value === 'undefined' || value === '') {
    return undefined
  }

  if (firstLetterRegExp.test(value)) {
    return undefined
  }

  return 'Первым символов должна быть буква'
}

export const moreThanXSymbols = (x) => (value) => {
  if (typeof value === 'undefined' || value === '') {
    return undefined
  }

  if (value.toString().length <= x) {
    return `Не меньше ${x}-${pluralizeWord(x, [
      'го',
      'х',
      'ми',
    ])} символ${pluralizeWord(x, ['а', 'ов', 'ов'])}`
  }

  return undefined
}
