import { createSelector } from 'reselect'

import { CopyNotifications } from 'dictionary'

// Actions
const SET_COPY_NOTIFICATION =
  'REQUESTS/SET_COPY_NOTIFICATION'
const SET_COPY_TIMER = 'REQUESTS/SET_COPY_TIMER'

const initialState = {
  copyNotification: {
    type: CopyNotifications.NotCopied,
    id: undefined,
  },
  copyTimer: undefined,
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_COPY_NOTIFICATION:
      return {
        ...state,
        copyNotification: payload,
      }
    case SET_COPY_TIMER:
      return {
        ...state,
        timer: payload,
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

// Action creators
export const setCopyNotification = (payload) => ({
  type: SET_COPY_NOTIFICATION,
  payload,
})

export const setCopyTimer = (payload) => ({
  type: SET_COPY_TIMER,
  payload,
})

// Middleware
export const notifyAboutCopy = (notification) => (
  dispatch
) => {
  dispatch(setCopyNotification(notification))

  const timerId = setTimeout(() => {
    dispatch(
      setCopyNotification(initialState.copyNotification)
    )
    dispatch(setCopyTimer(undefined))
  }, 2000)

  dispatch(setCopyTimer(timerId))
}
