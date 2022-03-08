var express = require('express');
var router = express.Router();

const order = require('../../models').order;
const auth = require('../../middleware/auth');

/* POST delete product. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }
    
    const { order_id } = req.body;
    if (!order_id) {
        return res.status(400).send('Require order_id');
      }
  

    order.destroy({
      where: {
          id: order_id
      }
    }).then(o => {
      if (!o) {
        return res.status(404).send({error: 'Order not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;