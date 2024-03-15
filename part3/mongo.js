const mongoose = require('mongoose')

const fs = require('fs')

const filePath = 'mongodb-url'

let url = ''
try {
    url = fs.readFileSync(filePath, 'utf-8')
} catch (err) {
    console.error(`Error reading file: ${err}`)
}

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 2) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name}  ${person.number}`)
        })
        mongoose.connection.close()
    })
    
} else if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person.save().then(result => {
        console.log(`Added ${process.argv[2]} number ${process.argv[3]} to phonebook`)
        mongoose.connection.close()
    })
}
