// npx nodemon index.js

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()

const Person = require('./models/phonebook')

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }))

// Middleware to log requests
// app.use(morgan('tiny'))
// Define a custom token for logging request body
const morgan = require('morgan')
morgan.token('post-data', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return '-'
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('------')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint!' })
}

app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date()
            response.send(`<h1>Phonebook has info for ${count} people</h1><p>${date.toString()}<p>`)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
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
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/addperson', (request, response, next) => {
    const body = request.body

    Person.findOne({ name: body.name })
        .then(result => {
            if (result) {
                response.status(400).json({ error: 'name must be unique' })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })

                person.save()
                    .then(savedPerson => {
                        response.json(savedPerson)
                    })
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error))
})

app.put('/api/updateperson/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ' + 3001)
})