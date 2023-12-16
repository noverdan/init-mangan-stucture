const { paket, kategori_produk, kota, menu, ulasan, usaha } = require('../models')
const Rp = require('../utils/Rupiah')

module.exports = {
    getAllPaket: async (req, res) => {
        try {
            const listPackages = []
            const packages = await paket.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id_kota', 'id_kategori', 'id_usaha']
                },
                include: [
                    {
                        model: kategori_produk,
                        attributes: ["kategori"]
                    },
                    {
                        model: kota,
                        attributes: ["nama_kota"]
                    },
                    {
                        model: usaha,
                        attributes: ["nama_usaha"]
                    }
                ],
                raw: true
            })
            await Promise.all(packages.map(async (item) => {
                const menus = await menu.findAll({
                    where: { id_paket: item.id },
                    attributes: {
                        exclude: ["makanan_pokok", "sayur", "lauk", "tambahan", "image_url", "createdAt", "updatedAt"]
                    }
                });
                const reviews = await ulasan.findAll({
                    where: { id_paket: item.id },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id_user", "ulasan", "id_paket", "tanggal"]
                    }
                })
                const rangeHarga = () => {
                    const hargaTertinggi = Math.max(...menus.map(menu => menu.harga_menu));
                    const hargaTerendah = Math.min(...menus.map(menu => menu.harga_menu));
                    return `${Rp(hargaTerendah)} - ${Rp(hargaTertinggi)}`
                };
                const rating = () => {
                    if (reviews.length) {
                        const bintang = reviews.map(item => item.bintang)
                        const sumBintang = bintang.reduce((acc, nilai) => acc + nilai, 0);
                        const avgBintang = sumBintang / reviews.length
                        const rating = avgBintang.toFixed(1);
                        return rating
                    } else {
                        return ""
                    }
                }
                const packageData = {
                    ...item,
                    total_menu: menus.length,
                    range_harga: rangeHarga(),
                    rating: rating(),
                };
                listPackages.push(packageData);
            }))
            res.status(201).json({
                code: "SUCCESS",
                message: "Berhasil fetch Package Data",
                package: listPackages
            })
        } catch (error) {
            res.status(500).json({
                code: "ERR",
                message: error.message
            })
        }
    },
    getPackageById: async (req, res) => {
        try {
            const { idPaket } = req.params
            const package = await paket.findOne({
                where: {
                    id: idPaket
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id_kota', 'id_kategori', 'id_usaha']
                },
                include: [
                    {
                        model: kategori_produk,
                        attributes: ["kategori"]
                    },
                    {
                        model: kota,
                        attributes: ["nama_kota"]
                    },
                    {
                        model: usaha,
                        attributes: ["nama_usaha"]
                    }
                ],
                raw: true
            })
            const menus = await menu.findAll({
                where: { id_paket: idPaket },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });
            const rangeHarga = () => {
                const hargaTertinggi = Math.max(...menus.map(menu => menu.harga_menu));
                const hargaTerendah = Math.min(...menus.map(menu => menu.harga_menu));
                return `${Rp(hargaTerendah)} - ${Rp(hargaTertinggi)}`
            };
            const reviews = await ulasan.findAll({
                where: { id_paket: idPaket },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id_user", "ulasan", "id_paket", "tanggal"]
                }
            })
            const rating = () => {
                if (reviews.length) {
                    const bintang = reviews.map(item => item.bintang)
                    const sumBintang = bintang.reduce((acc, nilai) => acc + nilai, 0);
                    const avgBintang = sumBintang / reviews.length
                    const rating = avgBintang.toFixed(1);
                    return rating
                } else {
                    return 0
                }
            }
            res.status(200).json({
                code: "SUCCESS",
                message: "Berhasil mengambil data paket",
                package: {
                    ...package,
                    harga: rangeHarga(),
                    rating: rating(),
                    menu: menus
                }
            })
        } catch (error) {
            res.status(500).json({
                code: "ERR",
                message: error.message
            })
        }
    },
    //menambahkan paket baru (seller auth needed)
    addPaket: async (req, res) => {
        const levelUser = req.payload.id_level
        const data = req.body
        if (levelUser == 2) {
            if (isPackageValid(data)) {
                createPackage(data)
                    .then((createPaketRes) => {
                        console.log(createPaketRes.nama_produk + ", created");
                        const promises = data.menu.map(item => {
                            return createMenu(createPaketRes, item)
                                .then(() => {
                                    console.log(item.nama_menu + ", created");
                                }).catch((err) => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: "ERR",
                                        message: err.message
                                    })
                                })
                        })
                        return Promise.all(promises);
                    })
                    .then(() => {
                        res.status(201).json({
                            code: "SUCCESS",
                            message: "berhasil menambahkan data"
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: "ERR",
                            message: err.message
                        })
                    })

                return
            } else {
                res.status(400).json({
                    code: "BAD",
                    message: "Bad Request"
                })
            }
        } else {
            res.status(403).json({
                code: "FORBIDDEN",
                message: "No authorization"
            })
        }
    }
}

function isPackageValid(package) {
    const $ = package
    if ($.nama_produk && $.id_kategori && $.id_usaha && $.id_kota && $.image_url && $.deskripsi && $.menu.length) {
        return true
    } else {
        return false
    }
}
function createPackage(data) {
    return paket.create({
        nama_produk: data.nama_produk,
        id_kategori: data.id_kategori,
        id_usaha: data.id_usaha,
        id_kota: data.id_kota,
        image_url: data.image_url,
        deskripsi: data.deskripsi,
        terjual: 0
    })
}
function createMenu(dataPaket, dataMenu) {
    return menu.create({
        nama_menu: dataMenu.nama_menu,
        makanan_pokok: dataMenu.makanan_pokok,
        sayur: dataMenu.sayur,
        lauk: dataMenu.lauk,
        tambahan: dataMenu.tambahan,
        harga_menu: dataMenu.harga_menu,
        id_paket: dataPaket.id,
        image_url: dataMenu.image_url
    })
}