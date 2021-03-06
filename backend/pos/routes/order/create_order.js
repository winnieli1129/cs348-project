var express = require('express');
var router = express.Router();

const product = require('../../models').product;
const order = require('../../models').order;
const customer = require('../../models').customer;
const store = require('../../models').store;
const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');
const db = require('../../models/index');

/* POST create order. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }
    
    var { customer_email, store_id, products } = req.body;

    if (!(store_id && products)) {
      return res.status(400).send('Require store_id and products in form of [{serial_number:string, quantity:int}]');
    }

    const searchCondition = customer_email ? { email: customer_email } : { id: 0 };

    const c = await customer.findOne({ where: searchCondition });
    if (!c) {
      return res.status(404).send('Customer doesn\'t exists');
    }

    const s = await store.findOne({
      where: {
        id: store_id
      }
    });
    if (!s) {
      return res.status(404).send('Store doesn\'t exists');
    }

    const t = await db.sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED });

    const new_order = await order.create({
      customer_id: c.id,
      store_id: store_id,
      total_price: 0
    }, { transaction: t });

    for (const bought_product of products) {
      const p = await product.findOne({
        where: {
          serial_number: bought_product['serial_number']
        }
      });
      if (!p) {
        return res.status(409).send('Product ' + bought_product['serial_number'] + ' doesn\'t exists');
      }
      const i = await inventory.findOne({
        where: {
          product_id: p.id,
          store_id: store_id
        }
      });
      if (!i || i.quantity < bought_product['quantity']) {
        await t.rollback();
        return res.status(409).send('Product ' + p.product_name + '(Serial Number: ' + bought_product['serial_number'] + ') doesn\'t have enough stock.\n Order fail to create.');
      }
      i.quantity -= bought_product['quantity'];
      i.save({ transaction: t });
      await new_order.addProduct(p, { through: { quantity: bought_product['quantity'] }, transaction: t })
      new_order.total_price += p.price * bought_product['quantity'];
      await new_order.save({ transaction: t });
    }
    await t.commit();

    c.reward_points += new_order.total_price;
    await c.save();

    return res.status(201).json(new_order);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;