var express = require('express');
var router = express.Router();

const customer = require('../models').customer;

/* POST delete customer. */
router.post('/', async function(req, res, next) {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).send('Require customer_id');
    }

    customer.destroy({
      where: {
        id: customer_id
      }
    }).then(count => {
      if (!count) {
        return res.status(404).send({error: 'Customer not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;