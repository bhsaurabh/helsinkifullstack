import { useState, useEffect } from 'react'
import notesService from './services/notes'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')  // store user input in newNote
  const [showAll, setShowAll] = useState(true)  // show all notes or only important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const hook = () => {
    notesService.getAll().then(initialNotes => { 
      setNotes(initialNotes)
    })
  }

  useEffect(hook, [])  // hook is called when the component is rendered first time ([])

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    notesService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')  // clear the input field
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    notesService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))  // update the changed note in the state
    }).catch(error => {
      alert(
        `the note '${note.content}' was already deleted from the server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={ () => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        { notesToShow.map(note => <Note note={note} key={note.id} toggleImportance={() => toggleImportanceOf(note.id)} />) }
      </ul>
      {/* form to add a new note */ }
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App