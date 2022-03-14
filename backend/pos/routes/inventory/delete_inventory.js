var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');

/*POST delete inventory */
router.post('/', auth, async function(req,res,next){
  try{
    if(req.user.employee !== true){
      return res.status(401).send('Unauthorized User');
    }

    const { inventory_id } = req.body;

    if(!inventory_id) {
      return res.status(400).send('Requires inventory_id');
    }

    inventory.destroy({
      where: {id: inventory_id}
    }).then(inventory => {
      if (!inventory) {
        return res.status(404).send({error: 'Inventory not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;