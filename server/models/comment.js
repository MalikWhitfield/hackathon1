let mongoose = require('mongoose')
let Schema = mongoose.Schema
let name = "Comment"
let ObjectId = Schema.Types.ObjectId

const subComment = new Schema({
  author: { type: ObjectId, ref: 'User' },
  imageId: { type: ObjectId, ref: 'Image' },
  videoId: { type: ObjectId, ref: 'Video' },
  commentId: { type: ObjectId, ref: 'Comment' },
  description: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true }
})

//Comment schema
let schema = new Schema({
  author: { type: ObjectId, ref: 'User' },
  imageId: { type: ObjectId, ref: 'Image' },
  videoId: { type: ObjectId, ref: 'Video' },
  description: { type: String, required: true },
  date: { type: Number, default: Date.now(), required: true },
  subComments: [subComment]
})

let model = mongoose.model(name, schema)

module.exports = model