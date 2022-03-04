var express = require('express');
var router = express.Router();

const customer = require('../models').customer;
const auth = require('../middleware/auth');

/* GET retrieve customer with id. */
router.get('/', auth, async function(req, res, next) {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      res.status(400).send('Required customer_id');
    }
    const user = await customer.findOne({
      where: {
        id: customer_id
      }
    });
    if (!user) {
      return res.status(404).send('User Didn\'t Exist.');
    }

    return res.status(200).json(user);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;