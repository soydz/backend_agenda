require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const URL = process.env.Mongo_URL
mongoose.connect(URL)
    .then(result => {
        console.log('Connectes to MongoDB')
    })
    .catch(error => {
        console.log('Error in connection', error.message)
    })

const personShema = new mongoose.Schema({
    name: String,
    number: Number,
})

personShema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personShema)