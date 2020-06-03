import deepClone from './deepClone'
import getRequestId from './getRequestId'
import createHistoryObject from './createHistoryObject'

export default class RequestsHistory {
  static limit = 15

  constructor(serializedHistory = []) {
    this.history = deepClone(serializedHistory)
  }

  addRequest(req = {}, res = {}) {
    const reqId = getRequestId(res)

    if (this.hasRequest(reqId)) {
      return this.moveRequestOnTop(reqId)
    }

    const newRequest = createHistoryObject(req, res)
    this.history = [newRequest].concat(this.history)

    if (this.history.length > RequestsHistory.limit) {
      this.removeLastRequest()
    }

    return newRequest
  }

  findRequest(reqId) {
    return this.history.find(({ id }) => id === reqId)
  }

  hasRequest(reqOrId = {}) {
    const reqId =
      typeof reqOrId === 'string'
        ? reqOrId
        : getRequestId(reqOrId)
    return !!this.findRequest(reqId)
  }

  removeLastRequest() {
    return this.history.pop()
  }

  removeRequest(reqId) {
    const index = this.history.findIndex(
      ({ id }) => id === reqId
    )
    if (typeof index === 'undefined') {
      return undefined
    }

    const removedRequest = this.history[index]
    this.history.splice(index, 1)

    return removedRequest
  }

  moveRequestOnTop(reqId) {
    const movedRequest = this.removeRequest(reqId)
    if (typeof movedRequest === 'undefined') {
      return undefined
    }

    this.history = [movedRequest].concat(this.history)
    return movedRequest
  }

  isEmpty() {
    return this.history.length === 0
  }

  serialize() {
    return this.history
  }
}
