const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
const allRoutes = require('./routes')

app.use(allRoutes)

app.listen(PORT, () => {
    console.log("runnin on port", PORT)
})

