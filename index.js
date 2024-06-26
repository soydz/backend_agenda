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


app.get('/info', (req, res, next) => {
    Person.countDocuments({}, { hint: "_id_" })
        .then(result => {
            let dato1 = `<p>Phonebook has info for ${result} people</p>`
            let dato2 = `<p>${new Date()}</p>`
            res.send(dato1 + dato2)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// POST
app.post('/api/persons', (req, res, next) => {
    const note = req.body

    if (!note.name || !note.number) {
        return res.status(400).json({
            error: "Content Missing"
        })
    }

    Person.findById(req.params.id)
        .then(result => {
            console.log('resultado', result)
            if (result) {
                console.log('duplicado')
            } else {
                console.log('Disponible')
            }
        })
        .catch(error => next(error))

    const person = new Person({
        name: note.name,
        number: note.number
    })

    person.save()
        .then(result => {
        })
        .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const id = req.params.id

    const person = {
        number: body.number
    }

    Person.findByIdAndUpdate(id, person, { new: true })
        .then(updatePerson => {
            res.json(updatePerson)
        })
        .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({
            error: 'Recurso no encontrado'
        })
    }
    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})