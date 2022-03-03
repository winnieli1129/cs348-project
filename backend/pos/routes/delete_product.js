var express = require('express');
var router = express.Router();

const product = require('../models').product;
const auth = require('../middleware/auth');

/* POST delete product. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (!(req.body.hasOwnProperty('product_id') || req.body.hasOwnProperty('serial_number'))) {
      return res.status(400).send('Require either product_id or serial_number');
    }
  
    var searchCondition = req.body['product_id'] ? {id: req.body['product_id']} : {serial_number: req.body['serial_number']};      

    product.destroy({
      where: searchCondition
    }).then(product => {
      if (!product) {
        return res.status(404).send({error: 'Product not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;