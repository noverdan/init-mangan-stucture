const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000
const allRoutes = require('./routes')
const cors = require('cors');

app.use(express.json())
app.use(cors())
app.use(allRoutes)

app.listen(PORT, () => {
    console.log("runnin on port", PORT)
})

