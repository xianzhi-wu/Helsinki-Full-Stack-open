const PersonForm = (props) => {
    return (
        <form onSubmit={props.submit}>
            <div>
                <div>name: <input onChange={props.handleName}/></div>
                <div>number: <input onChange={props.handleNumber}/></div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm