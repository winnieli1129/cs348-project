var express = require('express');
var router = express.Router();

const product = require('../models').product;
const auth = require('../middleware/auth');

/* POST customer registration. */
router.post('/', auth, async function(req, res, next) {
  try {
    const { serial_number, product_name, price } = req.body;

    if (!(serial_number && product_name && price)) {
      return res.status(400).send('Require serial_number, product_name, and price');
    }

    const old_product = await product.findOne({
      where: {
        serial_number: serial_number
      }
    });
    if (old_product) {
      return res.status(409).send('Product Already Exist.');
    }

    const new_product = await product.create({
      serial_number: serial_number,
      product_name: product_name,
      price: price
    });

    return res.status(201).json(new_product);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;