import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

import phonebookServices from './PhonebookServices'

const Phonebook = () => {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        phonebookServices
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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

        const p = persons.find(p => {return p.name == person.name})
        if(p) { 
            if(window.confirm(p.name + ' is already added to phonebook, replace the old number with a new one?')) {
                phonebookServices
                    .updatePerson(p.id, person)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
                    })
                return
            } else {
                return 
            }
        }

        phonebookServices
            .create(person)
            .then(returnPerson => {
                setPersons(persons.concat(returnPerson))
                setKeyword('')
            })
    }

    // Search
    const [keyword, setKeyword] = useState('')

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value)
    }

    const del = (id, name) => {
        if (window.confirm('Delete ' + name + ' ?')) {
            phonebookServices
                .deletePerson(id)
                .then(deletedPerson => {
                    setPersons(persons.filter(person => person.id !== deletedPerson.id))
                    console.log(deletedPerson.id)
                })
        } 
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter eventHandler={handleKeywordChange} keyword={keyword} />
            <h2>add a new</h2>
            <PersonForm submit={addContact} handleName={handleNameChange} handleNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons keyword={keyword} persons={persons} handleDel={del} />
        </div>
    )
}

export default Phonebook