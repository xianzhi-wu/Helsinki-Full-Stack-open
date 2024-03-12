import { useState } from 'react'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [person, setPerson] = useState({name: '', number: ''})

    const handleNameChange = (event) => {
        setPerson(prevState => ({ ...prevState, name: event.target.value}));
    }

    const handleNumberChange = (event) => {
        setPerson(prevState => ({ ...prevState, number: event.target.value}));
    }

    // Add contact
    const addContact = (event) => {
        event.preventDefault()

        if(persons.find(p => {return p.name == person.name})) { 
            alert(person.name + ' is already added to phonebook')
            return
        }

        setPersons(persons.concat(person));
        setKeyword('')
    }

    // Search
    const [keyword, setKeyword] = useState('')

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value)
    }

    return (
        <div>
        <h2>Phonebook</h2>
        <Filter eventHandler={handleKeywordChange} keyword={keyword} />
        <h2>add a new</h2>
        <PersonForm submit={addContact} handleName={handleNameChange} handleNumber={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons keyword={keyword} persons={persons} />
        </div>
    )
}

export default Phonebook