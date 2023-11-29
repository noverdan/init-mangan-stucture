const express = require('express')
const route = express.Router()

const userRoute = require('./user-route')

route.get("/", (req, res) => {
    res.json("selamat datang di mangan")
})

route.use("/users", userRoute)

module.exports = route