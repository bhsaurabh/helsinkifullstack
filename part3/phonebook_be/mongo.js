const mongoose = require('mongoose')

if (process.argv.length < 3) {
    // password has not been provided as an arg.
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]  // 1st is node exec, then is the current script's exec and then are args

const url = `mongodb+srv://fullstack:${password}@fsdev.t0c97.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSDev`

mongoose.set('strictQuery', false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

/*
const person = new Person({
    name: 'Tester Bester',
    number: 123
})

person.save().then(result => {
    console.log('person saved', person)
    mongoose.connection.close()
})
*/

// fetching persons from the DB
Person.find({name: 'Tester Bester'}).then(results => {
    // results is an array of Person
    results.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})