import { useNotification } from '../reducers/notificationReducer'

const Notification = () => {

  const { state } = useNotification()

  console.log(state)

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
