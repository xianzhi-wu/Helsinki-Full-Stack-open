const Persons = (props) => {
    return (
        props.keyword.trim() == '' ? (
            props.persons.map(p => {
                return (
                    <div key={p.name}>{p.name} {p.number}</div>
                )
            })
        ) : (
            props.persons.map(p => {
                if (p.name.includes(props.keyword.trim())) {
                    return (
                        <div key={p.name}>{p.name} {p.number}</div>
                    )
                }
            })
        )
    )
}

export default Persons