'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pakets', 'kotaId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Kota',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pakets', 'kotaId');
  },
};
