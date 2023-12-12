const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user } = require('../models')
module.exports = {
    getAllUser: async (req, res) => {
        const users = await user.findAll({ attributes: { exclude: ['password'] } })

        res.json({
            message: "data ditemukan",
            data: users
        })
    },
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
                res.json({
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
            res.json({
                code: "ERR",
                message: "gagal menambahkan data",
                error: err.message
            })
        }

    }
}