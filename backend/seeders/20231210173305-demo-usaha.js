'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usahas', [
      {
        nama_usaha: "Mangan Catering",
        alamat: "jakarta",
        id_seller: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usahas', null, {});

  }
};
