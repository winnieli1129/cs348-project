var express = require('express');
var router = express.Router();

const inventory = require('../../models').inventory;
const auth = require('../../middleware/auth');

/* GET retrieve inventory with id */
router.get('/', auth, async function(req, res, next){
  try{
    if(req.user.employee !== true){
      return res.status(401).send('Unauthorized User');
    }

    const { inventory_id } = req.body;

    if(!inventory_id) {
      return res.status(400).send('Require inventory_id');
    }

    const i = await inventory.findOne({
      where: {id: inventory_id}
    });
    if(!s) {
      return res.status(404).send('Inventory does not exist.');
    }

    return res.status(200).json(i)
} catch(err){
    console.log(err);
}
});

module.exports = router;