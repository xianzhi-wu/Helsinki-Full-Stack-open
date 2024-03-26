import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const keyword = useSelector(state => state.filter)

    const visibleAnecdotes = useMemo(() => {
        console.log(anecdotes)
        if (keyword.trim() === '') {
          return anecdotes.slice().sort((a, b) => b.votes - a.votes)
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(keyword))
      }, [anecdotes, keyword])

    const dispatch = useDispatch()

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted ${content}`))
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
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList