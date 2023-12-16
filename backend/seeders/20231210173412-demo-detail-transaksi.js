'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('detail_transaksis', [
      {
        nama: 'Galang',
        no_hp: '08746864688',
        waktu_acara: new Date(),
        alamat: 'jakarta',
        catatan: 'super pedas',
        jumlah_porsi: 100,
        total_harga: 100000000
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('detail_transaksis', null, {});
  }
};
