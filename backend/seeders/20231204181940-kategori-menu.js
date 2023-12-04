'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kategori_menus', [
      {
        kategori: "kitanan"
      },
      {
        kategori: "rice box"
      },
      {
        kategori: "pernikahan"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('kategori_menus', null, {});
  }
};
