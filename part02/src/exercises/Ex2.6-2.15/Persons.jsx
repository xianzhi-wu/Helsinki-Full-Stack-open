const Persons = (props) => {

    return (
        props.keyword.trim() == '' ? (
            props.persons.map(p => {
                return (
                    <div key={p.id}>{p.name} {p.number}<button onClick={() => props.handleDel(p.id, p.name)}>delete</button></div>
                )
            })
        ) : (
            props.persons.map(p => {
                if (p.name.includes(props.keyword.trim())) {
                    return (
                        <div key={p.id}>{p.name} {p.number}<button onClick={() => props.handleDel(p.id, p.name)}>delete</button></div>
                    )
                }
            })
        )
    )
}

export default Persons