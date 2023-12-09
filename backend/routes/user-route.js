const express = require('express')
const { getAllUser } = require('../controllers/user-controller')
const route = express.Router()

route.get("/", getAllUser)

module.exports = route