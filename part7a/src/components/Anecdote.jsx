const Anecdote = ({ anecdote }) => {
    return (
        <div>
            <h1>{anecdote.content} by {anecdote.author}</h1>
            <div>has {anecdote.votes} votes</div>
            <div>for more info see <a href="{anecdote.info}" target="_blank">{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote