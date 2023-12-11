'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_menu: {
        type: Sequelize.STRING
      },
      makanan_pokok: {
        type: Sequelize.STRING
      },
      sayur: {
        type: Sequelize.STRING
      },
      lauk: {
        type: Sequelize.STRING
      },
      tambahan: {
        type: Sequelize.STRING
      },
      harga_menu: {
        type: Sequelize.INTEGER
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
      image_url: {
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
    await queryInterface.dropTable('menus');
  }
};