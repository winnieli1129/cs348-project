var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
const store = require('../../models').store;
const product = require('../../models').product;
const auth = require('../../middleware/auth');

/* GET retrieve inventories by store_id or product_id, both, or neither. */
router.get('/', auth, async function(req, res, next) {
  try{
    if(req.user.employee !== true){
      return res.status(401).send('Unauthorized User');
    }

    const { store_id, product_id } = req.body;

    //If no criteria are provided, return all inventories
    if(!(store_id || product_id)){
      const i = await inventory.findAll({
        include: [
          { model: store},
          { model: product}
        ]
      });
      return res.status(200).json(i);
    }

    if (store_id) {
      const s = await store.findOne({
        where: {
          id: store_id
        }
      });
      if(!s){
        return res.status(404).send('Store not found.')
      }
    }

    //Find all inventories for a certain store
    if(store_id && !product_id){
      const i = await inventory.findAll({
        where: { store_id: store_id },
        include: [
          { model: store},
          { model: product}
        ]
      });
      return res.status(200).json(i);
    }

    if (product_id) {
      const p = await product.findOne({
        where: { id: product_id }
      });
      if(!p){
        return res.status(404).send('Product not found.')
      }
    }

    //Find all inventories of a certain product
    if(product_id && !store_id){
      const i = await inventory.findAll({
        where: { product_id: product_id },
        include: [
          { model: store},
          { model: product}
        ]
      });
      return res.status(200).json(i);
    }

    //Find the inventory of a certain product at a certain store
    // product_id && store_id
    const i = await inventory.findOne({
        where: {
          product_id: product_id,
          store_id: store_id
        },
        include: [
          { model: store},
          { model: product}
        ]
    });
    if(!i){
      return res.status(404).send('No inventory found for that product at that store.')
    }
    return res.status(200).json(i);


  } catch(err) {
      console.log(err);
  }
});

module.exports = router;