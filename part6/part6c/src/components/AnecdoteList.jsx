import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'

import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const keyword = useSelector(state => state.filter)

    const visibleAnecdotes = useMemo(() => {
        if (keyword.trim() === '') {
            return anecdotes.slice().sort((a, b) => b.votes - a.votes)
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(keyword))
      }, [anecdotes, keyword])

    const dispatch = useDispatch()

    const voteAnecdote = (id, content) => {
        dispatch(vote(id))
        dispatch(setNotification(`You voted ${content}`, 5000))
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