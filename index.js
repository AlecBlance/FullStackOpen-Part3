const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// rest: get_phonebook_entries
app.get('/api/persons', (_, res) => {
  res.json(persons)
})

// rest: get_phonebook_info
app.get('/info', (_, res) => {
  const body = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `
  res.send(body)
})

// rest: get_phonebook_entry
app.get('/api/persons/:id', (req, res)=>{
  const personId = Number(req.params.id)
  const person = persons.find(({id}) => id === personId)
  person ? res.json(person) : res.status(404).end()
})

// rest: delete_phonebook_entry
app.delete('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id)
  persons = persons.filter(({id}) => id !== personId)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})