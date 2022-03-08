var express = require('express');
var router = express.Router();

const product = require('../../models').product;
const order = require('../../models').order;
const auth = require('../../middleware/auth');

/* POST create order. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }
    
    const { customer_id, store_id, products } = req.body;

    if (!(customer_id && store_id && products)) {
      return res.status(400).send('Require customer_id, store_id, and products in form of [{serial_number:string, quantity:int}]');
    }

    const new_order = await order.create({
      customer_id: customer_id,
      store_id: store_id,
      total_price: 0
    });
    console.log(products)

    for (const bought_product of products) {
      const p = await product.findOne({
        where: {
          serial_number: bought_product['serial_number']
        }
      });
      if (!p) {
        return res.status(409).send('Product ' + bought_product['serial_number'] + ' doesn\'t exists');
      }
      await new_order.addProduct(p, { through: { quantity: bought_product['quantity'] } })
      new_order.total_price += p.price * bought_product['quantity'];
      await new_order.save();
    }

    return res.status(201).json(new_order);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;