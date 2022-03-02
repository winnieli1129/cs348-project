var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const customer = require('../models').customer;
const auth = require('../middleware/auth');

/* POST update customer. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (!req.body.hasOwnProperty('customer_id')) {
      return res.status(400).send('Require customer_id');
    }

    const customer_id = req.body['customer_id'];
    delete req.body['customer_id']
    if (req.body.hasOwnProperty('password')) {
      encryptedPassword = await bcrypt.hash(req.body['password'], 10);
      req.body['password'] = encryptedPassword;
    }
    
    customer.update(req.body, {
        where: {
          id: customer_id
        }
    }).then(user => {
      if (user == 0) {
        return res.status(404).send({error: 'Customer not found'});
      }

      return res.status(200).send();
    });

  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;