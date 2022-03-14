var express = require('express');
var router = express.Router();
const { QueryTypes } = require('sequelize');
const db = require('../../models/index');

const product = require('../../models').product;
const auth = require('../../middleware/auth');
const e = require('express');

/* POST delete product. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }
    
    if (!(req.body.hasOwnProperty('product_id') || req.body.hasOwnProperty('serial_number'))) {
      return res.status(400).send('Require either product_id or serial_number');
    }
  
    
    // TODO: change to raw sql
    // var p;
    // if (req.body['product_id']) {
    //   p = await db.sequelize.query(`DELETE FROM \`products\` WHERE \`id\`=:id;`, { replacements: {id: req.body['product_id']}, type: QueryTypes.DELETE });
    // } else {
    //   p = await db.sequelize.query(`DELETE FROM \`products\` WHERE \`serial_number\`=:num;`, { replacements: {num: req.body['serial_number']}, type: QueryTypes.DELETE });
    // }

    // return res.status(200).send();

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