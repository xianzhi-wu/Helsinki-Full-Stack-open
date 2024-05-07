import Total from "./Total";
import Part from "./Part"

const Content = (props) => {
    let total = 0;

    const items = props.parts.map(item => {
        total += item.exercises;

        return (
            <Part key={item.id} part={item.part} exercises={item.exercises} />
        )
    })

    return (
        <>
            {...items}
            <Total total={total} />
        </>
    )
}

export default Content