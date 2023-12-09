'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'menus'
          },
          key: 'id'
        },
        allowNull: false
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
      jumlah: {
        type: Sequelize.STRING
      },
      tanggal_acara: {
        type: Sequelize.DATE
      },
      id_pembayaran: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pembayarans'
          },
          key: 'id'
        },
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING
      },
      keterangan: {
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
    await queryInterface.dropTable('transaksis');
  }
};