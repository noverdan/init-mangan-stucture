'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pakets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_paket: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'kategori_menus'
          },
          key: 'id'
        },
        allowNull: false
      },
      id_ulasan: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ulasans'
          },
          key: 'id'
        },
        allowNull: false
      },
      id_seller: {
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
    await queryInterface.dropTable('pakets');
  }
};