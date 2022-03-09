var express = require('express');
var router = express.Router();
const { QueryTypes } = require('sequelize');
const db = require('../../models/index');

const customer = require('../../models').customer;
const auth = require('../../middleware/auth');

/* GET retrieve customer with id. */
router.get('/', auth, async function(req, res, next) {
  try {
    const { customer_id } = req.body;

    if (!customer_id) {
      return res.status(400).send('Required customer_id');
    }

    // TODO: change to raw sql
    // const user = await db.sequelize.query(`SELECT * FROM \`customers\` WHERE \`id\`=${customer_id};`, { type: QueryTypes.SELECT });
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