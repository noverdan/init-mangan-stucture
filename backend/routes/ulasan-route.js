const express = require('express')
const route = express.Router()
const { getUlasanByPaket } = require('../controllers/ulasan-controller')

route.get("/:idPaket", getUlasanByPaket)

module.exports = route