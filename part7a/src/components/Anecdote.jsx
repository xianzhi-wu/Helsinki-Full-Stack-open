import PropTypes from 'prop-types'

const Anecdote = ({ anecdote }) =>  (
    <div>
        <h1>{anecdote.content} by {anecdote.author}</h1>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see <a href="{anecdote.info}" target="_blank">{anecdote.info}</a></div>
    </div>
)

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    }).isRequired
}

export default Anecdote