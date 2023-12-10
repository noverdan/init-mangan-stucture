'use strict';

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('metode_pembayarans', [
      {
        metode: 'Qris',
        batas_bayar: new Date(),
        status_bayar: 'Lunas',
        tanggal_bayar: new Date(),
        link_pembayaran: 'xxxxxx'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('metode_pembayarans', null, {});
  }
};
