var express = require('express');
var router = express.Router();

const product = require('../models').product;
const auth = require('../middleware/auth');

/* GET retrieve all products. */
router.get('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const p = await product.findAll();

    return res.status(200).json(p);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;