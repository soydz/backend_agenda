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
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        }
    }
})

personShema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personShema)