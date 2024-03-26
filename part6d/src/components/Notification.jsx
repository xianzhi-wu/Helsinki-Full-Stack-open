import NotificationContext from '../reducers/notificationReducer'

import { useContext } from 'react'

const Notification = () => {

  const { state } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: state.message ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification
