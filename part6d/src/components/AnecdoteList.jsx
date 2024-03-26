import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react'
import { useMemo } from 'react'

import { vote } from '../reducers/anecdoteReducer'
import NotificationContext from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const visibleAnecdotes = useMemo(() => {
        if (filter.trim() === '') {
          return anecdotes.slice().sort((a, b) => b.votes - a.votes)
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
      }, [anecdotes, filter])
      
    const dispatch = useDispatch()
    const { setNotification } = useContext(NotificationContext)

    const voteAnecdote = (id, content) => {
        dispatch(vote(id))
        setNotification(`You voted ${content}`, 5000)
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList