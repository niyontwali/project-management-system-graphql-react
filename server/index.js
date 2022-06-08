const express = require('express');
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const colors = require('colors');
const cors = require('cors');
const path = require('path')

const connectDB = require('./config/db')

const schema = require('./schema/schema')

dotenv.config()

const port = process.env.PORT || 9000

const app = express()

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// Connect to db and server
connectDB()
.then(() => {
  return app.listen(port, console.log(`Server running on port ${port}`))
})
.catch(error => console.log(error.message))