'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kotas', [
      {
        nama_kota: "Jakarta"
      },
      {
        nama_kota: "Bogor"
      },
      {
        nama_kota: "Depok"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('kotas', null, {});
  }
};
