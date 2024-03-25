import { createSlice } from '@reduxjs/toolkit'

const initialNotificationState = {
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotif(state, action) {
      state.message = action.payload
    },
    clearNotif(state) {
      state.message = null
    }
  }
})

export const { setNotif, clearNotif } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(setNotif(content))
    const timer = setTimeout(() => {
      dispatch(clearNotif())
      clearTimeout(timer)
    }, timeout)
  }
}

export default notificationSlice.reducer
