const router = require('express').Router()
const bcrypt = require('bcrypt')
const { CreateUser, GetUser } = require('../models/user')

router.post('/register', function (req, res, next) {
  bcrypt.hash(req.body.password, 9, async function (err, hash) {
    if (err) throw err

    req.body.phash = hash
    const user = await CreateUser(req.body)

    // check for errors

    console.log(user)
    res.json(user)
  })
})

router.post('/login', async function (req, res, next) {
  const user = await GetUser(req.body)
  bcrypt.compare(req.body.password, user.phash, function (err, res) {
    if (err) throw err

    // check for errors

    res.json(res ? user : null)
  })
})

module.exports = router
