const { CreateUser, GetUser } = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserRegister = async function (req, res) {
  // check for errors
  req.body.phash = await bcrypt.hash(req.body.password, 9)

  // check for errors
  const user = await CreateUser(req.body)

  console.log(user)
  res.json(user)
}

const UserLogin = async function (req, res) {
  // check for errors
  const user = await GetUser(req.body)

  // check for errors
  const match = await bcrypt.compare(req.body.password, user.phash)

  // sign with RSA SHA256
  const token = jwt.sign({ id: user.id, name: user.name, phone: user.phone }, process.env.KEY, { algorithm: 'HS256' })

  res.json(match ? { user, token } : null)
}

module.exports = { UserRegister, UserLogin }
