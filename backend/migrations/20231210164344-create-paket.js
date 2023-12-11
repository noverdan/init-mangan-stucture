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
      nama_produk: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'kategori_produks'
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
      id_kota: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'kotas'
          },
          key: 'id'
        },
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING
      },
      deskripsi: {
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