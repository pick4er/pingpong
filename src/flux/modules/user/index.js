import { createSelector } from 'reselect';
import { loginRequest } from 'api';

// Actions
const SET_IS_LOADING = 'USER/SET_IS_LOADING'
const SET_ERROR = 'USER/SET_ERROR'

const initialState = {
  isLoading: undefined,
  error: undefined,
}

export default function reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: payload
      }
    default:
      return state
  }
}

// Selectors
const selectUserModule = state => state.user

export const selectIsLoading = createSelector(
  selectUserModule,
  ({ isLoading }) => isLoading
)

export const selectError = createSelector(
  selectUserModule,
  ({ error }) => error
)

// Action createors
export const setIsLoading = payload => ({
  type: SET_IS_LOADING,
  payload
})

export const setError = payload => ({
  type: SET_ERROR,
  payload
})

// Middleware
export const loginAction = credentials => async (dispatch, getState) => {
  dispatch(setIsLoading(true))
  dispatch(setError(undefined))

  const response = await loginRequest(credentials)
    .catch(e => {
      dispatch(setError(e))
    })
  dispatch(setIsLoading(false))
}