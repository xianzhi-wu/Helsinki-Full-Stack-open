import { useState, useEffect } from 'react'
import Note from '../components/Note'
import noteService from './notes'

const NotesApp = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
  
    noteService
        .create(noteObject)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
        })
        .catch(error => {
            alert(
                `the note '${note.content}' was already deleted from server`
            )
            setNotes(notes.filter(n => n.id !== id))
        })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important}

    noteService
        .update(id, changeNote)
        .then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default NotesApp