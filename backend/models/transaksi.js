'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi.init({
    id_menu: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    id_usaha: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER,
    id_pembayaran: DataTypes.INTEGER,
    id_detail_transaksi: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};