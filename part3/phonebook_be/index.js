const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())  // json-parser middleware to read request, and populate request.body
app.use(morgan('tiny'))


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

const requestLogger = (request, response, next) => {
    // middleware to log every request
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}
//app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


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

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name && !body.number) {
        // no name and number specified, error our
        console.log("NOT creating a new person, no name or number:", body)
        return response.status(400).json({
            error: 'name or number missing' 
        })
    }
    if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())) {
        // name already exists, not re-creating.
        console.log("NOT creating a new person, name already exists", body)
        return response.status(400).json({
            error: 'person with same name exists in phonebook' 
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }
    console.log("creating a new person:", person)
    persons = [...persons, person]
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})