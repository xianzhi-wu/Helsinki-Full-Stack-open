import { useState } from "react"

const  Stateful = () => {
    const [ counter, setCounter ] = useState(0)

    setTimeout(
        () => setCounter(counter + 1),
        1000
    )

    return (
      <div>{counter}</div>
    )
  }
  
  export default Stateful