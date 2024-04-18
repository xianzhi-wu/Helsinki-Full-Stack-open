import { useState } from "react"

const Async = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])
    const [total, setTotal] = useState(0)

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        /*
        The total number of button presses is consistently one less than the actual amount of presses, for some reason.
        The reason for this is that a state update in React happens asynchronously, i.e. 
        not immediately but "at some point" before the component is rendered again.
        */
        // setLeft(left + 1)
        // setTotal(left + right)
        const updatedLeft = left + 1
        setLeft(updatedLeft)
        setTotal(updatedLeft + right)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        // setRight(right + 1)
        // setTotal(left + right)
        const updatedRight = right + 1
        setRight(updatedRight)
        setTotal(left + updatedRight)
    }

    return (
        <div>
            {left}
            <button onClick={handleLeftClick}>left</button>
            <button onClick={handleRightClick}>right</button>
            {right}
            <p>{allClicks.join(' ')}</p>
            <p>total {total}</p>
        </div>
    )
}

export default Async