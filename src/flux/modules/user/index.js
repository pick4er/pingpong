import Cookies from 'cookies-js'
import { createSelector } from 'reselect'

import { sendsay, isNumeric } from 'helpers'
import { TOKEN_KEY, NotificationTypes } from 'dictionary'
import { notifyAboutLogin } from 'flux/modules/notifications'

// Actions
const SET_IS_LOADING = 'USER/SET_IS_LOADING'
const SET_ERROR = 'USER/SET_ERROR'
const SET_TOKEN = 'USER/SET_TOKEN'
const SET_LOGIN = 'USER/SET_LOGIN'
const SET_SUBLOGIN = 'USER/SET_SUBLOGIN'
const RESET_STATE = 'USER/RESET_STATE'
const SET_REQUEST_WIDTH = 'USER/SET_REQUEST_WIDTH'
const SET_RESPONSE_WIDTH = 'USER/SET_RESPONSE_WIDTH'

const initialState = {
  isLoading: false,
  login: '',
  sublogin: '',
  error: undefined,
  token: undefined,
  requestWidth: undefined,
  responseWidth: undefined,
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_LOGIN:
      return {
        ...state,
        login: payload,
      }
    case SET_REQUEST_WIDTH:
      return {
        ...state,
        requestWidth: payload,
      }
    case SET_RESPONSE_WIDTH:
      return {
        ...state,
        responseWidth: payload,
      }
    case SET_SUBLOGIN:
      return {
        ...state,
        sublogin: payload,
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      }
    case RESET_STATE:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

// Selectors
const selectUserModule = (state) => state.user

export const selectIsLoading = createSelector(
  selectUserModule,
  ({ isLoading }) => isLoading || false
)

export const selectLogin = createSelector(
  selectUserModule,
  ({ login }) => login
)

export const selectSublogin = createSelector(
  selectUserModule,
  ({ sublogin }) => sublogin
)

export const selectError = createSelector(
  selectUserModule,
  ({ error }) => error
)

export const selectToken = createSelector(
  selectUserModule,
  ({ token }) => token
)

export const selectRequestWidth = createSelector(
  selectUserModule,
  ({ requestWidth }) =>
    isNumeric(requestWidth)
      ? parseFloat(requestWidth)
      : undefined
)

export const selectResponseWidth = createSelector(
  selectUserModule,
  ({ responseWidth }) =>
    isNumeric(responseWidth)
      ? parseFloat(responseWidth)
      : undefined
)

export const selectIsAuth = createSelector(
  selectToken,
  (token) => !!token
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

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
})

export const setLogin = (payload) => ({
  type: SET_LOGIN,
  payload,
})

export const setSublogin = (payload) => ({
  type: SET_SUBLOGIN,
  payload,
})

export const resetState = (payload) => ({
  type: RESET_STATE,
  payload,
})

export const setRequestWidth = (payload) => ({
  type: SET_REQUEST_WIDTH,
  payload,
})

export const setResponseWidth = (payload) => ({
  type: SET_RESPONSE_WIDTH,
  payload,
})

// Middleware
const notifyAboutError = (message) => (dispatch) => {
  const error = JSON.parse(message)
  const { explain, id } = error

  dispatch(setError(error))
  dispatch(
    notifyAboutLogin({
      type: NotificationTypes.Error,
      title: 'Вход не вышел',
      message: JSON.stringify({ explain, id }),
    })
  )
}

export const loginAction = (credentials) => async (
  dispatch,
  getState
) => {
  const { sublogin: formSublogin } = credentials
  const isLoading = selectIsLoading(getState())
  if (isLoading) {
    return
  }

  dispatch(setIsLoading(true))
  dispatch(setError(undefined))

  await sendsay.login(credentials).catch(({ message }) => {
    dispatch(notifyAboutError(message))
  })

  if (selectError(getState())) {
    dispatch(setIsLoading(false))
    return
  }

  const credentialsRequest = await sendsay.request({ action: 'pong' }).catch(
    ({ message }) => {
      dispatch(notifyAboutError(message))
    }
  )

  dispatch(setIsLoading(false))
  if (selectError(getState())) {
    return
  }

  const { account, sublogin } = credentialsRequest
  dispatch(setLogin(account))
  if (formSublogin) {
    dispatch(setSublogin(sublogin))
  }

  Cookies.set(TOKEN_KEY, sendsay.session)
  dispatch(setToken(sendsay.session))
}

export const logoutAction = () => async (dispatch) => {
  dispatch(setLogin(initialState.login))
  dispatch(setSublogin(initialState.sublogin))
  dispatch(setToken(initialState.token))

  await sendsay.request({ action: 'logout' })
  Cookies.expire(TOKEN_KEY)
}
