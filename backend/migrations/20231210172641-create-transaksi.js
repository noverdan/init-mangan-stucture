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
      id_usaha: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usahas'
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
      id_pembayaran: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'metode_pembayarans'
          },
          key: 'id'
        },
        allowNull: false
      },
      id_detail_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'detail_transaksis'
          },
          key: 'id'
        },
        allowNull: false
      },
      keterangan: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('transaksis');
  }
};