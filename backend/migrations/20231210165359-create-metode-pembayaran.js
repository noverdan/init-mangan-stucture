'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('metode_pembayarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      metode: {
        type: Sequelize.STRING
      },
      batas_bayar: {
        type: Sequelize.DATE
      },
      status_bayar: {
        type: Sequelize.STRING
      },
      tanggal_bayar: {
        type: Sequelize.DATE
      },
      link_pembayaran: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('metode_pembayarans');
  }
};