'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kategori_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kategori_menu.init({
    kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kategori_menu',
  });
  return kategori_menu;
};