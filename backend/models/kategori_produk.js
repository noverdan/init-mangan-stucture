'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kategori_produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kategori_produk.hasMany(models.paket, { foreignKey: 'id_kategori' });
    }
  }
  kategori_produk.init({
    kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kategori_produk',
  });
  return kategori_produk;
};