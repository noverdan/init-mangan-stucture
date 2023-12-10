'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kategori_produks', [
      {
        kategori: 'Tumpeng'
      },
      {
        kategori: 'Rice box'
      },
      {
        kategori: 'Pernikahan'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('kategori_produks', null, {});
  }
};
