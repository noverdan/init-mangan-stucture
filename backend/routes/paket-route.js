const express = require('express')
const route = express.Router()

const { getAllPaket, addPaket, getPackageById } = require('../controllers/paket-controller')
const auth = require('../middleware/auth-middleware')

route.get("/", getAllPaket)
route.get("/:idPaket", getPackageById)
route.post("/", auth, addPaket)

module.exports = route