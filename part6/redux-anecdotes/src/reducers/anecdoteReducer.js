import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateVotes(state, action) {
      console.log(action.payload)
      const votedAnecdote = action.payload
      const id = votedAnecdote.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    }
  }
}

)

/* vanhat tehtävät  < 6.9
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

    case 'NEW_ANECDOTE':
      return [...state, action.data]
  }
  return state
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}
*/
export const voteAnecdote = anecdote => {
  return async dispatch => {

    const votesAdd = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anecdoteToChange = await anecdoteService.addVote(votesAdd)
    dispatch(updateVotes(anecdoteToChange))
  }

}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}


export const { appendAnecdotes, setAnecdotes, updateVotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer