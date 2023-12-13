const express = require('express')
const route = express.Router()

const userRoute = require('./user-route')
const paketRoute = require('./paket-route')
const sellerRoute = require('./seller-route')

route.get("/", (req, res) => {
    res.json("selamat datang di mangan API")
})

route.use("/users", userRoute)
route.use("/packages", paketRoute)
route.use("/seller", sellerRoute)

module.exports = route