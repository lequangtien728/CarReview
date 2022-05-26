const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  comment: String,
  userID: {type:mongoose.Schema.Types.ObjectId}
})
const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const carSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    comments: [commentsSchema], //embedded Schema
    likes: [likesSchema] // embedded schema
  })
 

module.exports = mongoose.model('Car', carSchema);