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
    console.log("returning / data: simple hello_world message")
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    // show number of persons in phonebook along with date/time of request receipt
    console.log("returning /info data: summary on phonebook data")
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
    console.log("returning /api/persons data: all persons")
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    // return a specific person
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    console.log("returning info for", id, person)

    // deal with person not existing!
    if (person) {
        console.log(">> person exists")
        response.json(person)
    } else {
        console.log(">> person does NOT exist")
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    // delete a specific person from the list
    const id = request.params.id
    if(!id) {
        console.log("deleting, but no id specified")
        response.status(404).end()
    }
    console.log("deleting id", id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})