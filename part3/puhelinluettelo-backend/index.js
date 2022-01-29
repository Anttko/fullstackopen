const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Phones = require('./models/phones')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHander = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

var morgan = require('morgan')
morgan.token('data', function (req, res) { return res.JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
/*
const generateId = () => {
    return Math.random() * 999999
}
*/

app.get('/api/persons', (request, response) => {
    Phones.find({}).then(p => {
        response.json(p)
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing ' })
    }
    const info = new Phones({
        name: body.name,
        number: body.number,

    })

    info.save()
        .then(savedPhones => savedPhones.toJSON())
        .then(savedAndFormattedNote => {
            response.json(savedAndFormattedNote)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Phones.findById(request.params.id).then(phone => {
        if (phone) {
            response.json(phone)
        }
        else {
            response.status(404).end()
        }


    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phones.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

    const body = request.body
    console.log(body)
    const info = {
        name: body.name,
        number: body.number
    }
    Phones.findByIdAndUpdate(request.params.id, info, { new: true })
        .then(updateContact => {
            response.json(updateContact)
        })
        .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
    Phones.find({})
        .then(p => {
            response.send(
                `
                <div>
                Phonebook has info for ${p.length} people
                <br/><br/>
                ${new Date()}
                </div>
                `
            )
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
app.use(errorHander)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})