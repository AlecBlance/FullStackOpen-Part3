require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Entry = require('./models/entry')

morgan.token('body', (req, _) => JSON.stringify(req.body))

const errorHandler = (error, req, res, next) => {
  if (error.name === 'NameError') return res.status(400).json({error: "name required"})
  if (error.name === 'NumberError') return res.status(400).json({error: "phone number required"})
  if (error.name === 'CastError') return res.status(400).json({error: "malformed id"})
  if (error.name === 'ValidationError') return res.status(400).json({error: error.message})
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.static('build'))
app.use(express.json())
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
app.get('/api/persons/:id', (req, res, next)=>{
  Entry.find({_id: req.params.id})
    .then(person => {
      person.length ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

// rest: delete_phonebook_entry
app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(_ => res.status(204).end())
    .catch(error => next(error))
})

// rest: add_phonebook_entry
app.post('/api/persons', (req, res, next) => {
  const person = req.body
  const {name, number} = person
  if (!name) return next({name: 'NameError'})
  if (!number) return next({name: 'NumberError'})
  Entry(person)
    .save()
    .then(person => res.json(person))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const entryInfo = {
    name: req.body.name,
    number: req.body.number
  }
  Entry.findByIdAndUpdate(req.params.id, entryInfo,{new: true})
    .then(entry => res.json(entry))
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})