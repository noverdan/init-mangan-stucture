const { User } = require("../models")

module.exports = {
    getAllUser: async (req, res) => {
        const users = await User.findAll({ attributes: { exclude: ['password'] } })

        res.json({
            message: "data ditemukan",
            data: users
        })
    }
}