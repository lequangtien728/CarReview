const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema({
  username: String,
  userId: {type:mongoose.Schema.Types.ObjectId}
})


const carSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    reviews: [reviewsSchema] //embedded Schema
  })
 

module.exports = mongoose.model('Car', carSchema);