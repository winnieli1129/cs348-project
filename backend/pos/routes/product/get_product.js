var express = require('express');
var router = express.Router();

const product = require('../../models').product;
const auth = require('../../middleware/auth');

/* GET retrieve product with id/serial number. */
router.get('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const { product_id, serial_number } = req.query;

    if (!(product_id || serial_number)) {
      return res.status(400).send('Require either product_id or serial_number');
    }
    var searchCondition = product_id ? {id: product_id} : {serial_number: serial_number};

    const p = await product.findOne({
      where: searchCondition
    });
    if (!p) {
      return res.status(404).send('Product Didn\'t Exist.');
    }

    return res.status(200).json(p);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;