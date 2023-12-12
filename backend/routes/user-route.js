const express = require('express')
const route = express.Router()

const { getAllUser, addUser } = require('../controllers/user-controller')

route.get('/:email', getAllUser)
// route.get('/:id', getUserById)
route.post('/register', addUser)
// route.post('/login', userLogin)
// route.use('/', todoRoute)

module.exports = route