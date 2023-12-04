'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_pembayaran: {
        type: Sequelize.DATE
      },
      tanggal_pemesanan: {
        type: Sequelize.DATE
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'transaksis'
          },
          key: 'id'
        },
        allowNull: false
      },
      total_harga: {
        type: Sequelize.STRING
      },
      id_status: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'status_pesanans'
          },
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('detail_pesanans');
  }
};