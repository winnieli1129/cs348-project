var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const auth = require('../../middleware/auth');

/*POST create store. */
router.post('/', auth, async function(req, res, next) {
  try{
    if(req.user.employee !== true){
        return res.status(401).send('Unauthorized User');
    }
    

    const { address, phone_number } = req.body;

    if (!(address && phone_number)){
      return res.status(400).send('Requires address and phone_number');
    }

    const old_store = await store.findOne({
      where: {
        address: address
      }
    });
    if (old_store) {
      return res.status(409).send('Store already exists at that address.');
    }

    const new_store = await store.create({
      address: address,
      phone_number: phone_number
    });

    return res.status(201).json(new_store);
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;