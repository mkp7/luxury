const { CreateUser, GetUserByPhone } = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserRegister = async function (req, res) {
  // check for errors
  req.body.phash = await bcrypt.hash(req.body.password, 9)

  // check for errors
  const user = (await CreateUser(req.body)).rows[0]

  if (!user) {
    res.status(500).end()
    return
  }

  console.log(user)

  res.json(user)
}

const UserLogin = async function (req, res) {
  // check for errors
  const user = (await GetUserByPhone(req.body.phone)).rows[0]

  if (!user) {
    res.status(401).end() // Unauthorized
    return
  }

  // check for errors
  const match = await bcrypt.compare(req.body.password, user.phash)
  delete user.phash

  // sign with RSA SHA256
  const token = jwt.sign(
    { id: user.id, name: user.name, phone: user.phone },
    process.env.KEY,
    { algorithm: 'HS256' }
  )

  console.log(user)

  if (!match) {
    res.status(401).end() // Unauthorized
    return
  }

  res.json({ user, token })
}

const UserInfo = async function (req, res) {
  try {
    const data = jwt.verify(req.body.token, process.env.KEY)
    const user = (await GetUserByPhone(data.phone)).rows[0]

    if (!user) {
      res.status(401).end() // Unauthorized
      return
    }

    delete user.phash

    res.json(user)
  } catch (err) {
    console.log(`${err.name}: ${err.message}`)

    res.status(401).end() // invalid token
  }
}

module.exports = { UserRegister, UserLogin, UserInfo }
