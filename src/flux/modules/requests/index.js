import { createSelector } from 'reselect'
import { apiRequest } from 'api'
import { RequestsHistory } from 'helpers'
import { notifyAboutCopy } from 'flux/modules/notifications'
import { CopyNotifications } from 'dictionary'

// Actions
const SET_ERROR = 'REQUESTS/SET_ERROR'
const SET_IS_LOADING = 'REQUESTS/SET_IS_LOADING'
const SET_RESPONSE = 'REQUESTS/SET_RESPONSE'
const SET_REQUEST = 'REQUESTS/SET_REQUEST'
const SET_HISTORY = 'REQUESTS/SET_HISTORY'

const initialState = {
  history: [],
  error: undefined,
  isLoading: undefined,
  response: '',
  request: '',
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_REQUEST:
      return {
        ...state,
        request: payload,
      }
    case SET_RESPONSE:
      return {
        ...state,
        response: payload,
      }
    case SET_HISTORY:
      return {
        ...state,
        history: payload,
      }
    default:
      return state
  }
}

// Selectors
const selectRequestsModule = (state) => state.requests

export const selectIsLoading = createSelector(
  selectRequestsModule,
  ({ isLoading }) => isLoading
)

export const selectError = createSelector(
  selectRequestsModule,
  ({ error }) => error
)

export const selectRequest = createSelector(
  selectRequestsModule,
  ({ request }) => request
)

export const selectResponse = createSelector(
  selectRequestsModule,
  ({ response }) => response
)

export const selectHistory = createSelector(
  selectRequestsModule,
  ({ history }) => history
)

// Action creators
export const setIsLoading = (payload) => ({
  type: SET_IS_LOADING,
  payload,
})

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
})

export const setRequest = (payload) => ({
  type: SET_REQUEST,
  payload,
})

export const setResponse = (payload) => ({
  type: SET_RESPONSE,
  payload,
})

export const setHistory = (payload) => ({
  type: SET_HISTORY,
  payload,
})

// Middleware
export const addRequestToHistory = (req = {}, res = {}) => (
  dispatch,
  getState
) => {
  const requestsHistory = new RequestsHistory(
    selectHistory(getState())
  )

  requestsHistory.addRequest(req, res)
  dispatch(setHistory(requestsHistory.serialize()))
}

export const requestAction = (req = {}) => async (
  dispatch
) => {
  dispatch(setIsLoading(true))
  dispatch(setError(null))

  const res = await apiRequest(req).catch((e) => {
    dispatch(setError(e))
  })

  dispatch(setIsLoading(false))
  dispatch(setResponse(JSON.stringify(res)))
  dispatch(addRequestToHistory(req, res))
}

export const execRequestAction = (reqId) => (
  dispatch,
  getState
) => {
  const requestsHistory = new RequestsHistory(
    selectHistory(getState())
  )
  const { request, response } = requestsHistory.findRequest(
    reqId
  )

  dispatch(setRequest(JSON.stringify(request)))
  dispatch(setResponse(JSON.stringify(response)))
}

export const copyRequestAction = (reqId) => (
  dispatch,
  getState
) => {
  const requestsHistory = new RequestsHistory(
    selectHistory(getState())
  )
  const { request } = requestsHistory.findRequest(reqId)

  navigator.clipboard
    .writeText(JSON.stringify(request))
    .then(
      () => {
        dispatch(
          notifyAboutCopy({
            type: CopyNotifications.Success,
            id: reqId,
          })
        )
      },
      () => {
        dispatch(
          notifyAboutCopy({
            type: CopyNotifications.Fail,
            id: reqId,
          })
        )
      }
    )
}

export const deleteRequestAction = (reqId) => (
  dispatch,
  getState
) => {}
