const express = require('express')
const app = express()

const data = require('./data.json')

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(data)
})

const PORT = 3025
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})