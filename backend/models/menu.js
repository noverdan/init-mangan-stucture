'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu.init({
    nama_menu: DataTypes.STRING,
    makanan_pokok: DataTypes.STRING,
    sayur: DataTypes.STRING,
    lauk: DataTypes.STRING,
    tambahan: DataTypes.STRING,
    harga_menu: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};