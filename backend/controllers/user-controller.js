const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user } = require('../models')

const SECRET = process.env.SECRET_KEY


module.exports = {
    // Mengambil user berdasarkan id dari payload (user yang sedang login diambil dari token)
    getUserById: async (req, res) => {
        const idUser = req.payload.id
        try {
            const getUser = await user.findOne({ where: { id: idUser }, attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
            res.json({
                code: "SUCCESS",
                message: "Berhasil mendapatkan user",
                user: getUser
            })
        } catch (error) {
            res.status(500).json({
                code: "ERR",
                error: error.message
            })
        }

    },
    // Menambahkan user (Register)
    addUser: async (req, res) => {
        let data = req.body
        if (!data.nama || !data.email || !data.password) {
            res.status(400).json({
                code: "BAD",
                message: "bad request"
            })
            return
        }
        try {
            const isEmailUsed = await user.findOne({ where: { email: data.email } });
            if (isEmailUsed) {
                res.status(406).json({
                    code: "EUSED",
                    message: "Email user already exsist"
                })
            } else {
                const hashPassword = bcrypt.hashSync(data.password, 10)
                data.password = hashPassword

                await user.create(data)

                const getUser = await user.findOne({ where: { email: data.email } });

                res.status(201).json({
                    code: "SUCCESS",
                    message: "Berhasil membuat user baru",
                    data: {
                        userId: getUser.id,
                        nama: getUser.nama,
                        email: getUser.email
                    }
                })
            }
        } catch (err) {
            res.status(500).json({
                code: "ERR",
                message: "gagal menambahkan data",
                error: err.message
            })
        }

    },
    // Login User
    userLogin: async (req, res) => {
        let data = req.body
        if (!data.email || !data.password) {
            res.status(400).json({
                code: "BAD",
                message: "bad request"
            })
            return
        }
        let getUser = await user.findOne({ where: { email: data.email } })
        try {
            if (!getUser) {
                res.status(404).json({
                    code: "NOTFOUND",
                    message: "user not found"
                })
            } else {
                let isPwdCorrect = bcrypt.compareSync(data.password, getUser.password)
                if (!isPwdCorrect) {
                    res.status(406).json({
                        code: "WRPWD",
                        message: "wrong-password"
                    })
                } else if (isPwdCorrect) {
                    const token = jwt.sign({ id: getUser.id, id_level: getUser.id_level, email: getUser.email }, SECRET, { expiresIn: '1d' })
                    res.json({
                        code: "SUCCESS",
                        message: "login-successful",
                        token
                    })
                } else {
                    res.status(501).json({
                        code: "SMTWR",
                        message: "There is something wrong"
                    })
                }
            }
        } catch (err) {
            res.status(500).json({
                code: "ERR",
                message: "Error Login Failed",
                error: err.message
            })
        }
    }
}