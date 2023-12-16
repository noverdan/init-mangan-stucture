const express = require('express')
const route = express.Router()

const { getUserById, addUser, userLogin } = require('../controllers/user-controller')
const auth = require('../middleware/auth-middleware')

route.get('/', auth, getUserById)
route.post('/register', addUser)
route.post('/login', userLogin)

module.exports = route