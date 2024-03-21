import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blogId) => {
  const response = await axios.patch(`${baseUrl}/like/${blogId}`)
  return response.data
}

const remove = async (blogId, token) => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { 
  getAll,
  create,
  like,
  remove
}