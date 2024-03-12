import { useState } from 'react'
import StatisticLine from './StatisticLine'
import Button from './Button'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad

  return (
    <div>
      {all == 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={all ? (1*props.good + 0*props.neutral + (-1)*props.bad) / all : 0 } />
          <StatisticLine text='good' value={(all ? props.good / all * 100: 0) + ' %'} />
        </>
      )}
    </div>
  )
}

const Unicafe = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' eventHandler={handleGood} />
      <Button text='neutral' eventHandler={handleNeutral} />
      <Button text='bad' eventHandler={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default Unicafe