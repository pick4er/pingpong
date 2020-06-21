import { createSelector } from 'reselect'

// Actions
const SET_COPY_NOTIFICATION =
  'NOTIFICATIONS/SET_COPY_NOTIFICATION'
const SET_COPY_TIMER = 'NOTIFICATIONS/SET_COPY_TIMER'
const SET_LOGIN_NOTIFICATION =
  'NOTIFICATIONS/SET_LOGIN_NOTIFICATION'
const SET_LOGIN_TIMER = 'NOTIFICATIONS/SET_LOGIN_TIMER'

const initialState = {
  copyNotification: {
    type: undefined,
    message: '',
    id: undefined,
  },
  loginNotification: {
    type: undefined,
    message: '',
    title: '',
  },
  copyTimer: undefined,
  loginTimer: undefined,
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_LOGIN_TIMER:
      return {
        ...state,
        loginTimer: payload,
      }
    case SET_LOGIN_NOTIFICATION:
      return {
        ...state,
        loginNotification: payload,
      }
    case SET_COPY_NOTIFICATION:
      return {
        ...state,
        copyNotification: payload,
      }
    case SET_COPY_TIMER:
      return {
        ...state,
        copyTimer: payload,
      }
    default:
      return state
  }
}

// Selectors
export const selectNotificationsModule = (state) =>
  state.notifications

export const selectCopyNotification = createSelector(
  selectNotificationsModule,
  ({ copyNotification }) => copyNotification
)

export const selectCopyTimer = createSelector(
  selectNotificationsModule,
  ({ copyTimer }) => copyTimer
)

export const selectLoginTimer = createSelector(
  selectNotificationsModule,
  ({ loginTimer }) => loginTimer
)

export const selectLoginNotification = createSelector(
  selectNotificationsModule,
  ({ loginNotification }) => loginNotification
)

// Action creators
export const setCopyNotification = (payload) => ({
  type: SET_COPY_NOTIFICATION,
  payload,
})

export const setCopyTimer = (payload) => ({
  type: SET_COPY_TIMER,
  payload,
})

export const setLoginTimer = (payload) => ({
  type: SET_LOGIN_TIMER,
  payload,
})

export const setLoginNotification = (payload) => ({
  type: SET_LOGIN_NOTIFICATION,
  payload,
})

// Middleware
export const notifyAboutCopy = (notification) => (
  dispatch,
  getState
) => {
  const copyTimer = selectCopyTimer(getState())
  if (copyTimer) {
    clearTimeout(copyTimer)
    dispatch(setCopyTimer(undefined))
  }

  dispatch(setCopyNotification(notification))
  const timerId = setTimeout(() => {
    dispatch(
      setCopyNotification(initialState.copyNotification)
    )
    dispatch(setCopyTimer(undefined))
  }, 1000)

  dispatch(setCopyTimer(timerId))
}

export const notifyAboutLogin = (notification) => (
  dispatch,
  getState
) => {
  const currentNotification = selectLoginNotification(
    getState()
  )
  if (currentNotification.type) {
    return
  }

  const currentLoginTimerId = selectLoginTimer(getState())
  if (currentLoginTimerId) {
    clearTimeout(currentLoginTimerId)
    dispatch(setLoginTimer(undefined))
  }

  dispatch(setLoginNotification(notification))
  const timerId = setTimeout(() => {
    dispatch(
      setLoginNotification(initialState.loginNotification)
    )
    dispatch(setLoginTimer(undefined))
  }, 6000)

  dispatch(setLoginTimer(timerId))
}
