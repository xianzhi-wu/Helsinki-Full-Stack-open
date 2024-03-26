import { createAnecdote } from '../reducers/anecdoteReducer'
import { useNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        //dispatch(useNotification(`You added ${content}`, 5000))
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