import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')  // store user input in newNote
  const [showAll, setShowAll] = useState(true)  // show all notes or only important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const hook = () => {
    console.log('effect');
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(response => {
      console.log('promise fulfilled');
      setNotes(response.data)
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
      id: notes.length + 1
    }
    setNotes([...notes, noteObject])
    setNewNote('')  // clear the input field
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={ () => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        { notesToShow.map(note => <Note note={note} key={note.id} />) }
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