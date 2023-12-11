'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status_pesanans', [
      {
        status: 'Sedang Disiapkan'
      },
      {
        status: 'Dalam Perjalanan'
      },
      {
        status: 'Pesanan Batal'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status_pesanans', null, {});
  }
};
