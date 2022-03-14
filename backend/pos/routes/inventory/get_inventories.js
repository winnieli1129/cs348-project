var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
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
      const i = await inventory.findAll();
      return res.status(200).json(i);
    }

    //Find all inventories for a certain store
    else if(store_id && !product_id){
      const i = await inventory.findAll({
        where: {id: store_id}
      });
      return res.status(200).json(i);
    }

    //Find all inventories of a certain product
    else if(product_id && !store_id){
      const i = await inventory.findAll({
        where: {id: product_id}
      });
      return res.status(200).json(i);
    }

    //Find the inventory of a certain product at a certain store
    else{ // product_id && store_id
        const i = await inventory.findOne({
            where: {
              product_id: product_id,
              store_id: store_id
            }
        });
        if(!i){
          return res.status(404).send('No inventory found for that product at that store.')
        }
        return res.status(200).json(i);
    }

  } catch(err) {
      console.log(err);
  }
});

module.exports = router;