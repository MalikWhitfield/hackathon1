let mongoose = require('mongoose')
const connectionString = 'mongodb://hackathon2:hackathon2@ds038888.mlab.com:38888/hackathon1'
let connection = mongoose.connection
mongoose.connect(connectionString, {
  useNewUrlParser: true
})
connection.on('error', err => {
  console.log("DATABASE ERROR: ", err)
})
connection.once('open', () => {
  console.log("Connected to Database")
})