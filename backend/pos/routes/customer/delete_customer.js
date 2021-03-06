var express = require('express');
var router = express.Router();
const { QueryTypes } = require('sequelize');
const db = require('../../models/index');

const customer = require('../../models').customer;
const auth = require('../../middleware/auth');

/* POST delete customer. */
router.post('/', auth, async function(req, res, next) {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).send('Require customer_id');
    }

    const user = await db.sequelize.query(`DELETE FROM \`customers\` WHERE \`id\`=:id;`, { replacements: {id: customer_id} });
    if (user[0].affectedRows === 0) {
      return res.status(404).send({error: 'Customer not found'});
    }

    return res.status(200).send();
    
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;