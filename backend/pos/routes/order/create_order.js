var express = require('express');
var router = express.Router();

const product = require('../../models').product;
const order = require('../../models').order;
const customer = require('../../models').customer;
const store = require('../../models').store;
const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');

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
      return res.status(409).send('Customer doesn\'t exists');
    }

    const s = await store.findOne({
      where: {
        id: store_id
      }
    });
    if (!s) {
      return res.status(409).send('Store doesn\'t exists');
    }

    const new_order = await order.create({
      customer_id: c.id,
      store_id: store_id,
      total_price: 0
    });

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
        await order.destroy({
          where: {
            id: new_order.id
          }
        })
        return res.status(409).send('Product ' + bought_product['serial_number'] + ' don\'t have enough stock\n Order fail to create.');
      }
      i.quantity -= bought_product['quantity'];
      i.save();
      await new_order.addProduct(p, { through: { quantity: bought_product['quantity'] } })
      new_order.total_price += p.price * bought_product['quantity'];
      await new_order.save();
    }

    c.reward_points = new_order.total_price;
    await c.save();

    return res.status(201).json(new_order);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;