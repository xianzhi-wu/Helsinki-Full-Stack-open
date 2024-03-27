import { createSlice } from '@reduxjs/toolkit'

const initialNotificationState = {
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
    },
    clearNotification(state) {
      state.message = null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
