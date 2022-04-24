import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes';


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data

}

const createNew = async (i) => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const object = { content: i, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const getAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const addVote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default {
    getAll,
    createNew,
    addVote,
    getAnecdote
}

