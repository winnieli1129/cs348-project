var express = require('express');
var router = express.Router();

const order = require('../../models').order;
const store = require('../../models').store;
const product = require('../../models').product;
const customer = require('../../models').customer;
const auth = require('../../middleware/auth');

/* GET retrieve all orders of a customer. */
router.get('/', auth, async function(req, res, next) {
  try {
    const { customer_id } = req.query;
    if (customer_id === undefined) {
        return res.status(400).send('Require customer_id');
    }
    const c = await customer.findOne({
      where: {
        id: customer_id
      }
    });
    if (!c) {
      return res.status(404).send('Customer Doesn\'t Exist.');
    }

    const orders = await order.findAll({
      where: {
        customer_id: customer_id
      },
      include: [
        { model: store},
        { model: product}
      ]
    });
    if (orders.length === 0) {
      return res.status(404).send('The customer doesn\'t have any orders.');
    }

    return res.status(200).json(orders);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;