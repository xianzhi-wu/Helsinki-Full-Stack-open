import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useDispatch } from 'react-redux'

import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteServices.createNew(content)
        dispatch(addAnecdote(newAnecdote))
        dispatch(setNotification(`You added ${newAnecdote.content}`))
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