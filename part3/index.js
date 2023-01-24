require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const { response } = require('express')



const app = express()
morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
  .catch(error => next(error))

})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then (result => {
    response.status(204).end()
    }
  )
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body
  const checkUsername = (obj) => obj.name === body.name

  if (!body.name) {
    return response.status(400).json({
      error: 'name is required'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number is required'
    })
  }

  Person.find({}).then (persons => {
    if (persons.some(checkUsername)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = new Person({
      name : body.name,
      number: body.number,
  
    })
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))


  })


})
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(
    request.params.id, person,
    { new: true, runValidators: true, context: 'query' }
)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})