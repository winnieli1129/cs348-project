'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.store, {
        foreignKey: 'store_id'
      });
      this.belongsTo(models.customer, {
        foreignKey: 'customer_id',
        onDelete: 'CASADE'
      });

      const order_product = sequelize.define('order_product', {
        quantity: DataTypes.INTEGER
      });
    
      this.belongsToMany(models.product, {
        through: order_product,
        foreignKey: 'order_id',
        otherKey: 'product_id',
    });
    }
  }
  order.init({
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};