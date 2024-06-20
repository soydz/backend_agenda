const express = require('express')
const app = express()

const data = require('./data.json')

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

const PORT = 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})