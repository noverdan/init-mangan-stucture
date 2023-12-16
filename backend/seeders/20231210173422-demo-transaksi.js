'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transaksis', [
      {
        id_menu: '1',
        id_paket: '1',
        id_usaha: '1',
        id_user: '3',
        id_status: '1',
        id_pembayaran: '1',
        id_detail_transaksi: '1',
        keterangan: 'sedang Dibuat',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transaksis', null, {});
  }
};
