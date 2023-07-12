require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Entry = require('./models/entry')

morgan.token('body', (req, _) => JSON.stringify(req.body))

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  Entry.find({}).then(persons => res.json(persons))
})

// rest: get_phonebook_info
app.get('/info', (_, res) => {
  Entry.find({}).then(persons => {
    const body = `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `
    res.send(body)
  })
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

// rest: add_phonebook_entry
app.post('/api/persons', (req, res) => {
  const person = req.body
  const {name, number} = person
  if (!name) return res.status(400).json({error: "name required"})
  if (!number) return res.status(400).json({error: "phone number required"})
  if (persons.some(person => person.name == name)) return res.status(400).json({error: "name must be unique"})
  person.id = Math.floor(Math.random() * 1000)
  persons = persons.concat(person)
  res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})