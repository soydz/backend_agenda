const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://esneider:${password}@cluster0.zgchlxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})


if (process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            result.forEach(note => {
                console.log(note)
            })
            mongoose.connection.close()
        })
} else if (process.argv.length === 5) {
    person
        .save()
        .then(result => {
            console.log(`Added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
        })
} else {
    console.log('Faltan argumentos')
    process.exit(1)
}

