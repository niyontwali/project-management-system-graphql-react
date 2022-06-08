const express = require('express');
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const colors = require('colors');
const connectDB = require('./config/db')

const schema = require('./schema/schema')

dotenv.config()

const port = process.env.PORT || 9000

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

// Connect to db and server
connectDB()
.then(() => {
  return app.listen(port, console.log(`Server running on port ${port}`))
})
.catch(error => console.log(error.message))