const router = require('express').Router()
const { UserRegister, UserLogin } = require('./controllers')

router.post('/register', UserRegister)
router.post('/login', UserLogin)

module.exports = router
