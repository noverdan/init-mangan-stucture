'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('level_users', [
      {
        level: "Admin"
      },
      {
        level: "Seller"
      },
      {
        level: "Customer"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('level_users', null, {});
  }
};
