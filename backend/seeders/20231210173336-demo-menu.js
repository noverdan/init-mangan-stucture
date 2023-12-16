'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('menus', [
      {
        nama_menu: "Menu 1",
        makanan_pokok: "Nasi Kuning",
        sayur: "kangkung",
        lauk: "ayam suir , daging suir , ikan suir",
        tambahan: "sambel",
        harga_menu: 1000000,
        id_paket: "1",
        image_url: "xxxxxx"
      },
      {
        nama_menu: "Menu 2",
        makanan_pokok: "Nasi Jeruk",
        sayur: "kangkung",
        lauk: "ayam suir , daging suir , ikan suir",
        tambahan: "sambel",
        harga_menu: 1000000,
        id_paket: "1",
        image_url: "xxxxxx"
      },
      {
        nama_menu: "Menu 1",
        makanan_pokok: "Nasi Putih",
        sayur: "kangkung",
        lauk: "ayam suir , daging suir , ikan suir",
        tambahan: "sambel",
        harga_menu: 1000000,
        id_paket: "1",
        image_url: "xxxxxx"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('menus', null, {});

  }
};
