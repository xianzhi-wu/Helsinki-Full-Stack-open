// npx nodemon index.js

const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const Person = require('./models/phonebook')

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }))

// Middleware to log requests
// app.use(morgan('tiny'))
// Define a custom token for logging request body
morgan.token('post-data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
    return '-'
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            const date = new Date()
            response.send(`<h1>Phonebook has info for ${count} people</h1><p>${date.toString()}<p>`)
        })
        .catch(error => {
            console.error('Error: ', error)
            response.send('Error: ', error)
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.deleteOne({_id: id}).then((err, res) => {
        if (res) {
            response.json(res).status(204).end()
        } else if (err) {
            response.json(err)
        }
    })
})

app.post('/api/addperson', (request, response) => {
    try {
        const data = request.body
        if (!data.name) {
            throw new Error('name is missing')
        } else if (Person.findOne({name: data.name})) {
            throw new Error('name must be unique')
        } else if (!data.number) {
            throw new Error('number is missing')
        }

        const person = new Person({
            name: data.name,
            number: data.number
        })

        person.save().then(savedPerson => {
            response.json({message: 'Adding person successfully!'})
        })
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal server error' })
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ' + 3001)
})