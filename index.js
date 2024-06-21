const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res[header] :body'))
app.use(express.json())
app.use(cors())

let data = require('./data.json')
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
    res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    let person = data.find(item => item.id === id)
    if (!person) {
        res.status(404)
        return res.json(noData)
    }
    res.json(person)
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