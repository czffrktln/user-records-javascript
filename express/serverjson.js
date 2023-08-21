const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
// const cors = require('cors');
const axios = require('axios');

// app.use(cors());

const readData = (filePath) => {
  const data = fs.readFileSync(filePath)
  const parseData = JSON.parse(data)
  return parseData
}

app.get('/', (req, res) => {
  const data = readData("./data.json")
  res.json(data)
})

app.get('/api/users', (req, res) => {
  const data = readData("./data.json")
  if (req.query.all) {
    res.json(data);
  } else if (req.query.limit) {
    const limitUsers = data.slice(0, req.query.limit)
    res.json(limitUsers)
  } else if (req.query.order_by == "name") {
    const sortedUsers = data.sort((a, b) => (a.name > b.name ? 1 : -1))
    res.json(sortedUsers)
  } else if (req.query.name) {
    const nameUsers = data.filter(user => user.name.includes(req.query.name))
    res.json(nameUsers)
  }else {
    const userNames = data.map(user => ({user: user.name}))
    res.json(userNames)
  }
})

app.get('/api/users/id/:id', (req, res) => {
  const data = readData("./data.json")
  const filterData = data.filter(user => user.id == req.params.id)
  res.json(filterData)
})

app.get('/api/users/username/:username', (req, res) => {
  const data = readData("./data.json")
  const filterData = data.filter(user => user.username.startsWith(req.params.username))
  res.json(filterData)
})

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
})