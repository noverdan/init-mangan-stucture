const bcrypt = require('bcrypt')
require('dotenv').config()
const { user, usaha } = require('../models')


module.exports = {
    //menambahkan seller baru (user_level=2)
    addSeller: async (req, res) => {
        const data = req.body
        if (!data.nama || !data.email || !data.password || !data.nama_usaha || !data.id_kota) {
            res.status(400).json({
                code: "BAD",
                message: "Bad Request"
            })
            return
        }
        try {
            const dataUser = {
                nama: data.nama,
                email: data.email,
                no_hp: data.no_hp,
                alamat: data.alamat,
                password: "",
                id_level: 2,
                image_url: data.image_url
            }
            const isEmailUsed = await user.findOne({ where: { email: data.email } });
            if (isEmailUsed) {
                res.status(406).json({
                    code: "EUSED",
                    message: "Email user already exsist"
                })
            } else {
                const hashPassword = bcrypt.hashSync(data.password, 10)
                dataUser.password = hashPassword
                user.create(dataUser)
                    .then(() => {
                        user.findOne({ where: { email: data.email } })
                            .then((userRes) => {
                                usaha.create({
                                    nama_usaha: data.nama_usaha,
                                    id_seller: userRes.id,
                                    id_kota: data.id_kota
                                })
                                    .then(() => {
                                        res.status(201).json({
                                            code: "SUCCESS",
                                            message: "Berhasil menambahkan user seller"
                                        })
                                    })
                                    .catch((err) => {
                                        res.status(500).json({
                                            code: "ERR",
                                            message: "gagal menambahkan data",
                                            error: err.message
                                        })
                                    })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    code: "ERR",
                                    message: "gagal menambahkan data",
                                    error: err.message
                                })
                            })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            code: "ERR",
                            message: "gagal menambahkan data",
                            error: err.message
                        })
                    })
            }
        } catch (err) {
            res.status(500).json({
                code: "ERR",
                message: "gagal menambahkan data",
                error: err.message
            })
        }
    }
}