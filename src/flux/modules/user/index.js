import Cookies from 'cookies-js'
import { createSelector } from 'reselect'
import {
  loginRequest,
  loginCredentialsRequest,
  sendsay,
} from 'api'

import { TOKEN_KEY, NotificationTypes } from 'dictionary'
import { notifyAboutLogin } from 'flux/modules/notifications'

// Actions
const SET_IS_LOADING = 'USER/SET_IS_LOADING'
const SET_ERROR = 'USER/SET_ERROR'
const SET_TOKEN = 'USER/SET_TOKEN'
const SET_LOGIN = 'USER/SET_LOGIN'
const SET_SUBLOGIN = 'USER/SET_SUBLOGIN'
const RESET_STATE = 'USER/RESET_STATE'

const initialState = {
  isLoading: false,
  login: '',
  sublogin: '',
  error: undefined,
  token: undefined,
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
  const isLoading = selectIsLoading(getState())
  if (isLoading) {
    return
  }

  dispatch(setIsLoading(true))
  dispatch(setError(undefined))

  await loginRequest(credentials).catch(({ message }) => {
    dispatch(notifyAboutError(message))
  })

  if (selectError(getState())) {
    return
  }

  Cookies.set(TOKEN_KEY, sendsay.session)
  const credentialsRequest = await loginCredentialsRequest().catch(
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
  dispatch(setSublogin(sublogin))
  dispatch(setToken(sendsay.session))
}

export const logoutAction = () => (dispatch) => {
  dispatch(resetState())
  Cookies.expire(TOKEN_KEY)
}
