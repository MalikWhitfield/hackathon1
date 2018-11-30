let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const SALT = 15
let name = "User"

//user schema
let User = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  username: { type: String, required: true }
})

//Hashes a password (used when password created/changed)
//STATICS are functions on the Class
User.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, SALT)
}

//Methods are functions on the INSTANCE of the class
//takes in a string and compares it to the Hash on the user object
User.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash) //use async to prevent bottlenecking
}


let model = mongoose.model(name, User)

module.exports = model