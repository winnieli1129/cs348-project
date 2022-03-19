var express = require('express');
var router = express.Router();

const order = require('../../models').order;
const store = require('../../models').store;
const product = require('../../models').product;
const customer = require('../../models').customer;
const auth = require('../../middleware/auth');

/* GET retrieve all orders of a store. */
router.get('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const { store_id } = req.query;
    if (!store_id) {
        return res.status(400).send('Require store_id');
    }
    const s = await store.findOne({
      where: {
        id: store_id
      }
    });
    if (!s) {
      return res.status(404).send('Store Doesn\'t Exist.');
    }

    const orders = await order.findAll({
      where: {
        store_id: store_id
      },
      include: [
        { model: customer},
        { model: product}
      ]
    });
    if (orders.length === 0) {
      return res.status(404).send('The store doesn\'t have any orders.');
    }

    return res.status(200).json(orders);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;