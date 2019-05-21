const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Welcome to Luxury, a cab service!'))
app.get('/login', (req, res) => res.send('Login form!'))
app.get('/register/driver', (req, res) => res.send('Driver registration form!'))
app.get('/register/rider', (req, res) => res.send('Rider registration form!'))

app.listen(port, () => console.log(`app listening on port ${port}!`))
