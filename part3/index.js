const express = require('express')
const app = express()
const morgan = require('morgan');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }))

// Middleware to log requests
// app.use(morgan('tiny'))
// Define a custom token for logging request body
morgan.token('post-data', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return '-';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

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

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const n = persons.length
    const date = new Date()
    response.send(`<h1>Phonebook has info for ${n} people</h1><p>${date.toString()}<p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

app.post('/api/addperson', (request, response) => {
    try {
        const data = request.body
        if (!data.name) {
            throw new Error('name is missing')
        } else if (persons.find(person => person.name === data.name)) {
            throw new Error('name must be unique')
        } 
        else if (!data.number) {
            throw new Error('number is missing')
        }
        const id = Math.floor(Math.random() * 100000000000)
        data.id = id

        persons.push(data)

        response.json({message: 'Adding person successfully!'})
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server running on port ' + 3001)
})