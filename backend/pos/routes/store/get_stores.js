var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const auth = require('../../middleware/auth');

/* GET retrieve all stores. */
router.get('/', auth, async function(req, res, next){
  try{
    if(req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const s = await store.findAll();

    return res.status(200).json(s);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;