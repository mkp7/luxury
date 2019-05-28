const { CreateUser, GetUser } = require('./models')
const bcrypt = require('bcrypt')

const UserRegister = function (req, res) {
  bcrypt.hash(req.body.password, 9, async function (err, hash) {
    if (err) throw err

    req.body.phash = hash
    const user = await CreateUser(req.body)

    // check for errors

    console.log(user)
    res.json(user)
  })
}

const UserLogin = async function (req, res) {
  const user = await GetUser(req.body)
  bcrypt.compare(req.body.password, user.phash, function (err, res) {
    if (err) throw err

    // check for errors

    res.json(res ? user : null)
  })
}

module.exports = { UserRegister, UserLogin }
