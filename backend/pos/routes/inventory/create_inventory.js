var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');

/*POST create inventory. */
router.post('/', auth, async function(req, res, next) {
  try{
    if(req.user.employee !== true){
      return res.status(401).send('Unauthorized User');
    }

    const { product_id, store_id, quantity } = req.body;

    if (!(product_id && store_id && quantity)){
      return res.status(400).send('Requires product_id, store_id, and quantity');
    }

    //Check for valid store.
    const s = await store.findOne({
      where: {
        store_id: store_id
      }
    });
    if(!s){
      return res.status(404).send('Store not found. New inventory requires valid store.')
    }

    //Check for valid product.
    const p = await product_id.findOne({
      where: {
        product_id: product_id
      }
    });
    if(!p){
      return res.status(404).send('Product not found. New inventory requires valid product.')
    }

    //Check that inventory doesn't already exist for that product at that store.
    const dupe_inv = await inventory.findOne({
      where: {
        product_id: product_id,    
        store_id: store_id
      }
    });
    if (dupe_inv) {
      return res.status(409).send('Inventory already exists for that product at that store.');
    }


    const new_inv = await inventory.create({
      product_id: product_id,
      store_id: store_id,
      quantity: quantity
    });

    return res.status(201).json(new_inv);
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;