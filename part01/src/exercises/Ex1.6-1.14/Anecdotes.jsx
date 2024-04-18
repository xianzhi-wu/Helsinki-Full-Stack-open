import { useState } from 'react'

const Anec = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const handleSelection = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
  // const [most, setMost] = useState(0)
  
  const handlePoints = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    // setMost(Math.max(...copy))
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <button onClick={() => handlePoints(selected)}>vote</button>
        <button onClick={handleSelection}>next anecdote</button>

        <h1>Anecdote with most votes</h1>
        {/*most > 0 ? (
            <>
                <p>{anecdotes[points.indexOf(most)]}</p>
                <p>has {most} {most > 1 ? (<>votes</>) : <>vote</>}</p>
            </>
        ) : (
            <></>
        )*/}
        {(() => {
            const most = Math.max(...points)
            if (most > 0) {
                return (
                    <>
                        <p>{anecdotes[points.indexOf(most)]}</p>
                        <p>has {most} {most > 1 ? (<>votes</>) : <>vote</>}</p>
                    </>
                )
            }
        })()}
    </div>
  )
}

export default Anec