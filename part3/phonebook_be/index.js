const express = require('express')
const app = express()


// test data to be read from/written to DB later.
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    // show number of persons in phonebook along with date/time of request receipt
    console.log("returning /info data")
    let numPersons = persons.length
    const now = new Date().toString()
    response.send(
        `
        <p>Phonebook has info for ${numPersons} people</p>
        <p>${now}</p>
        `
    )
})

app.get('/api/persons', (request, response) => {
    // return all persons
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})