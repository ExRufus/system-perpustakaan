'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.User, {
        foreignKey: 'win', // relasinya
        as: 'user' // sebagai user
      });
    }
  }
  Room.init({
    kode: DataTypes.STRING,
    home: DataTypes.INTEGER,
    away: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
