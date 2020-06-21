import deepClone from './deepClone'
import getRequestId from './getRequestId'
import createHistoryObject from './createHistoryObject'

export default class RequestsHistory {
  static limit = 15

  constructor(serializedHistory = []) {
    this.history = deepClone(serializedHistory)
  }

  add(req = {}, res = {}) {
    const reqId = getRequestId(res)

    if (this.has(reqId)) {
      return this.moveOnTop(reqId)
    }

    const newRequest = createHistoryObject(req, res)
    this.history = [newRequest].concat(this.history)

    if (this.history.length > RequestsHistory.limit) {
      this.removeLast()
    }

    return newRequest
  }

  find(reqId) {
    return this.history.find(({ id }) => id === reqId)
  }

  has(reqOrId = {}) {
    const reqId =
      typeof reqOrId === 'string'
        ? reqOrId
        : getRequestId(reqOrId)
    return !!this.find(reqId)
  }

  removeLast() {
    return this.history.pop()
  }

  remove(reqId) {
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

  moveOnTop(reqId) {
    const movedRequest = this.remove(reqId)
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
