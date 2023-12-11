'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usahas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_usaha: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      id_seller: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usahas');
  }
};