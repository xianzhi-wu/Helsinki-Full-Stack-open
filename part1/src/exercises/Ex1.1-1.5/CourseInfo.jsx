import Header from './Header'
import Content from './Content'
// import Total from './Total'

const CourseInfo = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          part: 'Fundamentals of React',
          exercises: 10
        },
        {
          part: 'Using props to pass data',
          exercises: 7
        },
        {
          part: 'State of a component',
          exercises: 14
        }
      ]
    }

    /*
    let total = 0;

    const itemList = courses.map((item, index) => {
      total += item.exercises;
    });
    */
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        {/* <Total total={total} /> */}
      </div>
    )
  }
  
  export default CourseInfo