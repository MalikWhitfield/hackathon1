let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Image"
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  caption: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  comments: { type: String, ref: 'Comment' }
})

let model = mongoose.model(name, schema)

module.exports = model