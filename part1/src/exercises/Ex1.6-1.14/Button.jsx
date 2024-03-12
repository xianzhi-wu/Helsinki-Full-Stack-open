const Button = (props) => {
    return (
        <button onClick={props.eventHandler}>{props.text}</button>
    )
}

export default Button