'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE'
      });

      this.belongsTo(models.store, {
        foreignKey: 'store_id',
        onDelete: 'CASCADE'
      });
    }
  }
  inventory.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'inventory',
  });
  return inventory;
};