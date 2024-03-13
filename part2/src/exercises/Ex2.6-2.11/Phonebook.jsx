import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const Phonebook = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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