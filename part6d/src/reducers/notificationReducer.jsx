// NotificationContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  message: ''
}

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.payload.message }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '' }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const clearNotification = () => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }

  useEffect(() => {
    let timeoutId
    if (state.message) {
      timeoutId = setTimeout(() => {
        clearNotification()
      }, state.duration || 5000) // Default duration: 5 seconds
    }
    return () => clearTimeout(timeoutId)
  }, [state.message, state.duration])

  const setNotification = (message, duration) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, duration } })
  }

  return (
    <NotificationContext.Provider value={{ state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)