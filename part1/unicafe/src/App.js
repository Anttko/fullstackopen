import React, { useState } from 'react'


const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (<p>No feedback given</p>)
  }

  const calcAll = () => (props.good + props.neutral + props.bad);
  const calcAvg = () => (props.good - props.bad) / (props.good + props.neutral + props.bad);
  const calcPos = () => (props.good / (props.good + props.neutral + props.bad)) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={calcAll()} />
        <StatisticLine text="average" value={calcAvg()} />
        <StatisticLine text="positive" value={calcPos()} />
      </tbody>

    </table>
  )
}
const Button = (props) => {
  console.log(props);
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (<tr><td>{props.text}</td><td>{props.value}%</td></tr>)
  }
  return (<tr><td>{props.text}</td><td>{props.value}</td></tr>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={goodClick} />
      <Button text="neutral" onClick={neutralClick} />
      <Button text="bad" onClick={badClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App