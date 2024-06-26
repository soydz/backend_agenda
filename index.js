const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./model/person')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res[header] :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

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
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
})

// POST
app.post('/api/persons', (req, res) => {
    const note = req.body

    if (!note.name || !note.number) {
        return res.status(400).json({
            error: "Content Missing"
        })
    }

    const person = new Person({
        name: note.name,
        number: note.number
    })

    person.save()
        .then(result => {
        })
})

// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))

    //data = data.filter(note => note.id !== id)
    //res.status(204).end()
})


const PORT = process.env.PORT || 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})