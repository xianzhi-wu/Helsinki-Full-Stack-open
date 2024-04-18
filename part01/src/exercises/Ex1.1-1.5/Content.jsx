import Total from "./Total";
import Part from "./Part"

const Content = (props) => {
    let total = 0;

    const items = props.parts.map((item, index) => {
        total += item.exercises;

        return (
            <Part key={index} part={item.part} exercises={item.exercises} />
        )
    })

    return (
        <>
            {...items}
            <Total total={total} />
        </>
    )
    /*
    return (
        <div>
           {props.courses.map((item, index) => (
                <Part key={index} part={item.part} exercises={item.exercises}/>
            ))}
        </div>
    )
    */
}

export default Content