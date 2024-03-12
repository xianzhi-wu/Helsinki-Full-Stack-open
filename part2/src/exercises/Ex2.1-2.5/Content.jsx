import Total from "./Total";
import Part from "./Part"

const Content = ({ courses }) => {
    const content = courses.map(course => {
        let total = course.parts.reduce((total, part) => {
            return total + part.exercises
        }, 0)

        const items = course.parts.map(item => {
            return (
                <Part part={item.name} exercises={item.exercises} />
            )
        })

        return (
            <div key={course.id}>
                <h2>{course.name}</h2>
                {...items}
                <Total total={total} />
            </div>
        )
    })

    return content
}

export default Content