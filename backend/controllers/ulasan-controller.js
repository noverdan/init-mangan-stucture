const { ulasan, user } = require('../models')
const formatDate = require('../utils/formatDate')

module.exports = {
    getUlasanByPaket: async (req, res) => {
        const { idPaket } = req.params
        try {
            let getUlasan = await ulasan.findAll({
                where: { id_paket: idPaket },
                attributes: { exclude: ["id_user", "createdAt", "updatedAt"] },
                include: [{ model: user, attributes: ["nama"] }],
                raw: true
            })
            if (getUlasan.length) {
                let ulasan = []
                getUlasan.map(item => {
                    const data = {
                        id: item.id,
                        user: item["user.nama"],
                        ulasan: item.ulasan,
                        id_paket: item.id_paket,
                        tanggal: formatDate(item.tanggal),
                        bintang: item.bintang
                    }
                    ulasan.push(data)
                })
                res.status(200).json({
                    code: "SUCCESS",
                    message: "berhasil mendapatkan data ulasan",
                    ulasan: ulasan
                })
            } else {
                res.status(404).json({
                    code: "NOTFOUND",
                    message: "data ulasan tidak ada"
                })
            }
        } catch (error) {
            res.json({
                code: "ERR",
                message: error.message
            })
        }

    }
}