'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        Nama: "Firman",
        email: "firman@mangan.com",
        no_hp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "1",
        image_url: "xxxxxxx"
      },
      {
        Nama: "jalil",
        email: "jalil@mangan.com",
        no_hp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "2",
        image_url: "xxxxxxx"
      },
      {
        Nama: "galang",
        email: "galang@mangan.com",
        no_hp: "08746864688",
        alamat: "indonesia",
        password: "123",
        id_level: "3",
        image_url: "xxxxxxx"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});

  }
};
