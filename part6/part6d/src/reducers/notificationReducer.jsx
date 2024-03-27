import PropTypes from 'prop-types'

import { createContext, useContext, useReducer, useEffect } from 'react'

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
      }, state.duration || 5000)
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

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default NotificationContext