import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = { content: anecdote, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...response.data, votes: response.data.votes + 1 }
  const updateResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return updateResponse.data
}

export default { getAll, createNew, voteAnecdote }