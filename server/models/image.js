let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Image"
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
  userId: { type: ObjectId, ref: 'User' },
  username: {type: String, required: true},
  caption: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  comments: { type: String, ref: 'Comment' },
  url: { type: String, required: true },
  vote: { type: Number }
})

let model = mongoose.model(name, schema)

module.exports = model