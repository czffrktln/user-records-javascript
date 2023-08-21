// const axios = require('axios')
// const User = require('./userschema')

// // mongoose.connect('mongodb://127.0.0.1/user_database')


// const getData = async () => {
//   const data = await axios.get('https://jsonplaceholder.typicode.com/users')
//   data.data.map(user => {
//     const instance = new User(user)
//     instance.save(function(err) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log("heureka");
//       }
//     })
//   })
// }

// getData()