'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class metode_pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  metode_pembayaran.init({
    metode: DataTypes.STRING,
    batas_bayar: DataTypes.DATE,
    status_bayar: DataTypes.STRING,
    tanggal_bayar: DataTypes.DATE,
    link_pembayaran: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'metode_pembayaran',
  });
  return metode_pembayaran;
};