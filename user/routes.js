const router = require('express').Router()
const { UserRegister, UserLogin, UserInfo } = require('./controllers')

router.post('/register', UserRegister)
router.post('/login', UserLogin)
router.post('/', UserInfo)

module.exports = router
