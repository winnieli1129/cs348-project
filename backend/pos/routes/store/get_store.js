var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const auth = require('../../middleware/auth');

/* GET retrieve store with id/address. */
router.get('/', auth, async function(req, res, next) {
  try{
    if(req.user.employee !== true){
        return res.status(401).send('Unauthorized User');
    }

    const { store_id } = req.body;

    if(!store_id) {
      return res.status(400).send('Require store_id');
    }

    const s = await store.findOne({
      where: { id: store_id}
    });
    if(!s) {
      return res.status(404).send('Store does not exist.');
    }

    return res.status(200).json(s)
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;