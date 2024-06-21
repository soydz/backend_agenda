const express = require('express')
const app = express()

const data = require('./data.json')
const noData = {
    data: 'No Data'
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
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

const PORT = 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})