const mongoose = require('mongoose')

if (process.argv.length < 4) {
    // password and mode have not been provided as an arg.
    console.log('give password & mode as an argument')
    process.exit(1)
}

const password = process.argv[2]  // 1st is node exec, then is the current script's exec and then are args
const mode = process.argv[3].toLowerCase()

const url = `mongodb+srv://fullstack:${password}@fsdev.t0c97.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSDev`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (mode === 'add') {
    const name = process.argv[4]
    const number = Number(process.argv[5])

    if (!name) {
        console.log("adding an entry needs a name")
        process.exit(1)
    }
    if (!number) {
        // this will be NaN if a non-number is supplied
        console.log("Phone has to be provided and should be a number")
        process.exit(1)
    }
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })   
} else if (mode === 'find') {
    const name = process.argv[4]
    if (!name) {
        console.log("finding an entry needs a name")
        process.exit(1)
    }

    // fetching persons from the DB
    Person.find({name: name}).then(results => {
        // results is an array of Person
        results.forEach(person => {
            console.log(person)
        })
    mongoose.connection.close()
})
}