'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      paket.belongsTo(models.kategori_produk, { foreignKey: 'id_kategori' });
      paket.belongsTo(models.kota, { foreignKey: 'id_kota' });
      paket.belongsTo(models.usaha, { foreignKey: 'id_usaha' });
    }
  }
  paket.init({
    nama_produk: DataTypes.STRING,
    id_kategori: DataTypes.INTEGER,
    id_usaha: DataTypes.INTEGER,
    id_kota: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    terjual: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
  });
  return paket;
};