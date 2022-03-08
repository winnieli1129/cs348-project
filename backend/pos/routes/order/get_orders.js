var express = require('express');
var router = express.Router();

const order = require('../../models').order;
const store = require('../../models').store;
const product = require('../../models').product;
const customer = require('../../models').customer;
const auth = require('../../middleware/auth');

/* GET retrieve all products. */
router.get('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const o = await order.findAll({
        include: [
            { model: customer},
            { model: store},
            { model: product}
          ]
    });

    return res.status(200).json(o);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;