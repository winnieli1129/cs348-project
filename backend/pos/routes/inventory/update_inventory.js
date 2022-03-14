var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');

/* POST update inventory */
router.post('/', auth, async function(req, res, next){
  try{
    if(req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    var { inventory_id, quantity } = req.body;

    if(!(inventory_id && quantity)){
      return res.status(400).send('Requires inventory_id and updated quantity for inventory.');
    }

    if(quantity < 0){
      return res.status(400).send('New quantity cannot be less than 0')
    }

    inventory.update(req.body, {
      where: { id: inventory_id }
    }).then(inventory => {
      if (inventory == 0){
        return res.status(404).send({error: 'Inventory not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;