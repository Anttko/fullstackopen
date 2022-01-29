const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const numb = process.argv[4]


if (process.argv.length < 3) {
    console.log('Please provide all nessesarry data as an argument: node mongo.js <password>')
    process.exit(1)
}

const url = `xxxxxxxx`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: Number
})

const PhoneBook = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    PhoneBook.find({}).then(result => {
        result.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
        process.exit(1)

    })
}
const person = new PhoneBook({
    name: name,
    number: numb
})

person.save().then(result => {
    console.log('Added', name, 'number', numb, 'to phonebook')
    mongoose.connection.close()
})








