import getResponseError from './getResponseError'

export default (res = {}) => !!getResponseError(res)
