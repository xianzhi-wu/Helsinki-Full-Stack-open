import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => 
                <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

// PropTypes is a package that allows you to define the type of each prop passed to a component, 
// ensuring that the component receives the correct type of data.
AnecdoteList.propTypes = {
    anecdotes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired
        })
    ).isRequired
}

export default AnecdoteList