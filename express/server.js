const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
// const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('./userschema')

// app.use(cors());

mongoose.connect('mongodb://127.0.0.1/user_database')

const getData = async () => {
  const data = await axios.get('https://jsonplaceholder.typicode.com/users')
  data.data.map(user => {
    const instance = new User(user)
    instance.save(function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("heureka");
      }
    })
  })
}

// getData()

app.get("/api/users", async (req, res) => {
  if (req.query.all) {
    const data = await User.find()
    res.send(data);
  } else if (req.query.limit) {
    const data = await User.find().limit(req.query.limit)
    res.send(data)
  } else if (req.query.order_by) {
    const name = req.query.order_by
    const data = await User.find().sort(name)
    res.send(data)
  } else if (req.query.name) {
    const data = await User.find({name:{$regex: req.query.name}})
    res.send(data)
  } else {
    const data = await User.find().select('name')
    res.send(data);
  }
})

app.get('/api/users/id/:id', async (req, res) => {
  const data = await User.findById(req.params.id)
  res.send(data)
})

app.get('/api/users/username/:username', async (req, res) => {
  const data = await User.find({ username: {$regex : "^" + req.params.username}});
  res.send(data)
})

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
})