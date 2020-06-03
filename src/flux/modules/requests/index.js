import { createSelector } from 'reselect'
import { apiRequest } from 'api'
import { RequestsHistory } from 'helpers'
import { notifyAboutCopy } from 'flux/modules/notifications'
import { NotificationTypes } from 'dictionary'

// Actions
const SET_ERROR = 'REQUESTS/SET_ERROR'
const SET_IS_LOADING = 'REQUESTS/SET_IS_LOADING'
const SET_RESPONSE = 'REQUESTS/SET_RESPONSE'
const SET_REQUEST = 'REQUESTS/SET_REQUEST'
const SET_HISTORY = 'REQUESTS/SET_HISTORY'
const SET_ID_TO_CHANGE = 'REQUESTS/SET_ID_TO_CHANGE'
const SET_DELETE_ACTION_TIMER =
  'REQUESTS/SET_DELETE_ACTION_TIMER'

const initialState = {
  history: [],
  idToChange: undefined,
  deleteActionTimer: undefined,
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
    case SET_DELETE_ACTION_TIMER:
      return {
        ...state,
        deleteActionTimer: payload,
      }
    case SET_ID_TO_CHANGE:
      return {
        ...state,
        idToChange: payload,
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

export const selectIdToChange = createSelector(
  selectRequestsModule,
  ({ idToChange }) => idToChange
)

export const selectDeleteActionTimer = createSelector(
  selectRequestsModule,
  ({ deleteActionTimer }) => deleteActionTimer
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

export const setIdToChange = (payload) => ({
  type: SET_ID_TO_CHANGE,
  payload,
})

export const setDeleteActionTimer = (payload) => ({
  type: SET_DELETE_ACTION_TIMER,
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

  let res
  try {
    res = await apiRequest(req)
  } catch ({ message }) {
    const parsedMessage = JSON.parse(message)

    res = parsedMessage
    dispatch(setError(parsedMessage))
  }

  dispatch(setIsLoading(false))
  dispatch(setResponse(JSON.stringify(res)))
  dispatch(addRequestToHistory(req, res))
}

export const execRequestAction = (reqId) => async (
  dispatch,
  getState
) => {
  const requestsHistory = new RequestsHistory(
    selectHistory(getState())
  )
  const { request } = requestsHistory.findRequest(reqId)
  await dispatch(requestAction(request))

  const requestsHistoryAfterAction = new RequestsHistory(
    selectHistory(getState())
  )
  requestsHistoryAfterAction.removeRequest(reqId)
  dispatch(setHistory(requestsHistoryAfterAction.serialize()))
  dispatch(setRequest(JSON.stringify(request)))
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
            type: NotificationTypes.Info,
            message: 'Скопировано',
            id: reqId,
          })
        )
      },
      () => {
        dispatch(
          notifyAboutCopy({
            type: NotificationTypes.Error,
            message: 'Ошибка',
            id: reqId,
          })
        )
      }
    )
}

export const deleteRequestAction = (reqId) => (
  dispatch,
  getState
) => {
  const currentTimerId = selectDeleteActionTimer(getState())
  if (currentTimerId) {
    return
  }

  dispatch(setIdToChange(reqId))

  const timerId = setTimeout(() => {
    const requestsHistory = new RequestsHistory(
      selectHistory(getState())
    )

    requestsHistory.removeRequest(reqId)
    dispatch(setHistory(requestsHistory.serialize()))

    dispatch(setDeleteActionTimer(undefined))
    dispatch(setIdToChange(''))
  }, 1000)
  dispatch(setDeleteActionTimer(timerId))
}

export const removeHistoryAction = () => (dispatch) => {
  dispatch(setHistory(initialState.history))
}
