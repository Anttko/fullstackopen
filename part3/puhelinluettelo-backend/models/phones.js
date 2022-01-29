const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((error) => {
        console.log('error connectiong to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        unique: true,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[0-9]{2,3}-[0-9]{6,12}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please add number in form: '040-123123' or '04-123123' min length 8 maximum 15 numbers`
        },
        required: [true, 'User phone number required']
    },
    minlength: 8

})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phones', personSchema)