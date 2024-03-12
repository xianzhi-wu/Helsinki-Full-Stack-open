const Filter = (props) => {
    return (
        <div>filter shown with <input onChange={props.eventHandler} value={props.keyword}/></div>
    )
}

export default Filter