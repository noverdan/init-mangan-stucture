'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('pakets', [
      {
        nama_produk: "Tumpeng Penuh Berkah",
        id_kategori: "1",
        id_usaha: "1",
        id_kota: "1",
        image_url: "xxxxxx",
        deskripsi: "Nasi Tumpeng Yang Sehat Dan Bergizi tinggi"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('pakets', null, {});

  }
};
