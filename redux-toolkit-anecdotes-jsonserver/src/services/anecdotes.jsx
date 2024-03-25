import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const vote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const votes = response.data['votes']
    const newVotes = votes + 1
    const voted  = await axios.patch(`${baseUrl}/${id}`, { ['votes']: newVotes })
    console.log(voted)
    return voted
    
}

export default { 
    getAll,
    createNew,
    vote
}