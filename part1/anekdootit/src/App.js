import React, { useState } from 'react'

const MostVotes = ({ votes, anecdotes }) => {
  let helpIndex = 0;
  let sum = 0;
  let highCount = 0;
  let indexOfHigh = 0;

  votes.forEach(i => {

    sum = sum + i;

    if (i > highCount) {
      highCount = i;
      indexOfHigh = helpIndex;
    }
    helpIndex += 1;
  })

  if (sum === 0) {
    return (<p>No votes given.</p>)
  }

  return (<p>{anecdotes[indexOfHigh]} <br></br>has {highCount} votes</p>)

}

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Vote = (props) => {
  return (
    <p>has {props.value} votes.</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(6).fill(0))

  const voteAnecdote = () => {
    const addVote = [...vote]
    addVote[selected] += 1
    setVote(addVote)
  }

  console.log(vote)
  const createRandomInt = () => Math.floor(Math.random() * (anecdotes.length-1))
  const changeAnecdote = () => setSelected(createRandomInt())

  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <Vote value={vote[selected]} />
      <Button text="next anecdote" onClick={changeAnecdote} />
      <Button text="vote" onClick={voteAnecdote} />

      <h2>Anecdote with most votes</h2>

      <MostVotes votes={vote} anecdotes={anecdotes} />

    </div>

  )
}

export default App