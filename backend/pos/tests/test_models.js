const Sequelize = require('sequelize');

const store = require('../models').store;
const employee = require('../models').employee;
const inventory = require('../models').inventory;
const product = require('../models').product;
const order = require('../models').order;
const customer = require('../models').customer;

const config = require(__dirname + '/../config/config.json')['development'];
sequelize = new Sequelize(config.database, config.username, config.password, config);


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");

    const s = await store.create({
      address: 'addr',
      phone_number: '0123456789'
    });
    const e = await employee.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'pwd',
      store_id: s.get('id')
    });
    const c = await customer.create({
      name: 'Winnie Li',
      email: 'winnie@gmail.com',
      phone_number: '7653276140',
      password: 'pwd'
    });
    const p = await product.create({
      serial_number: 'abc123',
      product_name: 'milk',
      price: 5.4
    });
    const i = await inventory.create({
      quantity: 5,
      product_id: p.get('id')
    });
    const o = await order.create({
      quantity: 1,
      total_price: 10.2,
      store_id: s.get('id'),
      customer_id: c.get('id')
    });
    o.addProduct(p, {
      through: {
        quantity: 2
      }
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

