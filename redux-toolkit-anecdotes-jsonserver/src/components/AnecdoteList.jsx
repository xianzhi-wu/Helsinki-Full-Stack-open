import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === 'ALL' || filter.trim() === '') {
            return anecdotes.slice().sort((a, b) => b.votes - a.votes)
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    const dispatch = useDispatch()

    const voteAnecdote = (id, content) => {
        console.log('vote', id)
        dispatch(vote(id))
        dispatch(setNotification(`You voted ${content}`, 5000))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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