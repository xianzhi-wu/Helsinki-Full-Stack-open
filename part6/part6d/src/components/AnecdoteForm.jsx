import { createAnecdote } from '../reducers/anecdoteReducer'
import NotificationContext from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'
import { useContext } from 'react'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const { setNotification } = useContext(NotificationContext)

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        setNotification(`You added ${content}`, 5000)
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div ><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm