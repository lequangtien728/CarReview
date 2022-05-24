const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    
  })
 

module.exports = mongoose.model('Car', carSchema);