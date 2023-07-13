const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@fullstackopen.wto0f0n.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]
  const entry = Entry({
    name: name,
    number: number
  })
  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Entry.find({}).then(result => {
    console.log('phonebook:')
    result.map(({ name, number }) => console.log(`${name} ${number}`))
    mongoose.connection.close()
  })
}