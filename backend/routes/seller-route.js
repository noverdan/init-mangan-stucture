const express = require('express')
const route = express.Router()

const { addSeller } = require('../controllers/seller-controller')

route.post("/register", addSeller)

module.exports = route