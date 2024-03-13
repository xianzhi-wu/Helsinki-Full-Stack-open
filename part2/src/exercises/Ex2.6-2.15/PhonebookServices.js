import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const requestAllPersons = axios.get(baseUrl)
    return requestAllPersons.then(response => response.data)
}

const getMaxId = () => {
    const requestMaxId = getAll()
                    .then(allPersons =>{
                        const maxId = Math.max(...allPersons.map(person => parseInt(person.id)))
                        console.log('max id ' + maxId)
                        return maxId
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        throw error; // Rethrow the error for handling in the caller
                    })
    return requestMaxId
}

const create = newPerson => {
    const addPerson = getMaxId()
                    .then(maxId => {
                        newPerson.id = (maxId + 1).toString()

                        const request = axios.post(baseUrl, newPerson)
                        return request.then(response => response.data)
                    })
    return addPerson
}

const deletePerson = id => {
    const delPerson = axios.delete(baseUrl + '/' + id)
    return delPerson.then(response => {
        console.log('deleted succefully: ', response.data)
        return response.data
    })
}

const updatePerson = (id, newPerson) => {
    console.log(newPerson)
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
  }

export default { getAll, create, deletePerson, updatePerson }