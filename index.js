require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res[header] :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const URL = process.env.Mongo_URL
mongoose.set('strictQuery', false)
mongoose.connect(URL)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

const noData = {
    data: 'No Data'
}

app.get('/', (req, res) => {
    res.send('<h1>Agenda telefónica</h1>')
})

app.get('/info', (req, res) => {
    let dato1 = `<p>Phonebook has info for ${data.length} people</p>`
    let dato2 = `<p>${new Date()}</p>`
    res.send(dato1 + dato2)
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(result => {
            res.json(result)
        })
    // mongoose.connection.close()
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
    // mongoose.connection.close()
})

// POST
app.post('/api/persons', (req, res) => {
    const note = req.body
    const nameDuplicado = data.find(person => person.name.toLowerCase() === note.name.toLowerCase())

    if (!note.name || !note.number) {
        return res.status(400).json({
            error: "Content Missing"
        })
    } else if (nameDuplicado) {
        return res.status(409).json({
            error: 'name must be unique'
        })
    }

    const generateId = Math.ceil((Math.random() * 150))
    const newNote = {
        id: generateId,
        name: note.name,
        number: note.number
    }

    data = data.concat(newNote)
    res.json(note)
})

// DELETE
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    data = data.filter(note => note.id !== id)
    res.status(204).end()
})


const PORT = process.env.PORT || 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})