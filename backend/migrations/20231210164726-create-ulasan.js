'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ulasans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      ulasan: {
        type: Sequelize.STRING
      },
      id_paket: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pakets'
          },
          key: 'id'
        },
        allowNull: false
      },
      tanggal: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      bintang: {
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
    await queryInterface.dropTable('ulasans');
  }
};