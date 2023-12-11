'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ulasans', [
      {
        id_user: "3",
        ulasan: "enak banget sumpah",
        id_paket: "1",
        bintang: "3"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ulasans', null, {});

  }
};
