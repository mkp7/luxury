const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const port = 3000

// built-in json payload parser
app.use(express.json())

// user login and register routes
app.use('/user', userRouter)

// app.get('/', (req, res) => res.send('Welcome to Luxury, a cab service!'))
// app.get('/register/driver', (req, res) => res.send('Driver registration form!'))
// app.get('/register/rider', (req, res) => res.send('Rider registration form!'))

app.listen(port, () => console.log(`app listening on port ${port}!`))
