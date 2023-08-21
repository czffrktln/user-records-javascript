const mongoose = require('mongoose');

// const Schema = mongoose.Schema
// const ObjectId = mongoose.Schema.ObjectId

const userSchema = new mongoose.Schema({
  // author: ObjectId,
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    street: String, 
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String
    }
  },
  phone: {type: String, required: true},
  website: String,
  company: {
    name: String,
    catchphrase: String,
    bs: String
  }
})

module.exports = mongoose.model('User', userSchema)