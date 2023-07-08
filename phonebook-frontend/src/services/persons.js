import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const addPerson = data => axios.post(baseUrl, data).then(response => response.data)

const deletePerson = id => axios.delete(`${baseUrl}/${id}`)

const updatePerson = (id, data) => axios.put(`${baseUrl}/${id}`, data).then(response => response.data)

export default {getAll, addPerson, deletePerson, updatePerson}