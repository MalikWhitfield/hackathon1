let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Video"
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  caption: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  // comments: { type: ObjectId, ref: 'Comment' },
  url: { type: String, required: true },
  vote: { type: Number }
})

let model = mongoose.model(name, schema)

module.exports = model