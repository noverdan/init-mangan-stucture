'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        Nama: "Firman",
        email: "firman@mangan.com",
        nohp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "10"
      },
      {
        Nama: "jalil",
        email: "jalil@mangan.com",
        nohp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "11"
      },
      {
        Nama: "galang",
        email: "galang@mangan.com",
        nohp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "12"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});

  }
};
