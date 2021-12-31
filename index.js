require('dotenv').config()
const app = require('./src/server')
const { connect } = require('./src/libs/db')

const PORT = process.env.PORT || 4000

connect()
  .then(() => {
    console.log('Database connection established')
    app.listen(PORT, () => {
      console.log('Server running on localhost:' + PORT)
    })
  })
  .catch(err => {
    console.log(err)
  })
