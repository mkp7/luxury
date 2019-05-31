const express = require('express')
const app = express()
const user = require('./user')

// built-in json payload parser middleware
app.use(express.json())

// user routes
app.use('/user', user)

console.log(process.env.KEY)

module.exports = app
