const jwt = require('jsonwebtoken')
require('dotenv').config();

const SECRET = process.env.SECRET_KEY

function auth(req, res, next) {
    const auth = req.headers.authorization
    try {
        if (!auth) {
            res.status(403).json({
                code: "UN-AUTH",
                message: "unauthorized-user"
            })
            return
        } else {
            const token = auth.split(" ")[1]
            if (!token) {
                res.status(403).json({
                    code: "UN-AUTH",
                    message: "unauthorized-user"
                })
                return
            } else {
                try {
                    var decoded = jwt.verify(token, SECRET);
                    req.payload = decoded
                } catch (err) {
                    res.status(406).json({
                        status: "TOKEN-ERR",
                        message: err.message
                    })
                    return
                }
            }
        }
    } catch (err) {
        res.status(500).json({
            status: "ERR",
            message: err.message
        })
        return
    }


    next()
}
module.exports = auth