var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const auth = require('../../middleware/auth');

/* POST update store. */
router.post('/', auth, async function(req, res, next) {
  try{
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User.');
    }

    const { store_id } = req.body;

    if(!store_id) {
        return res.status(400).send('Require store_id');
    }

    store.update(req.body, {
      where: { id: store_id }
    }).then(store => {
      if (store == 0) {
        return res.status(404).send({error: 'Store not found'});
      }

      return res.status(200).send();
    });

  } catch(err) {
    console.log(err);
  }
});

module.exports = router;