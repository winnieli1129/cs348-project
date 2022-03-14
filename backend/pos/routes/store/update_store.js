var express = require('express');
var router = express.Router();

const product = require('../../models').product;
const auth = require('../../middleware/auth');

/* POST update store. */
router.post('/', auth, async function(req, res, next) {
    try{
        if (req.user.employee !== true) {
            return res.status(401).send('Unauthorized User.');
        }

        if(!(req.body.hasOwnProperty('store_id') || req.body.hasOwnProperty('address'))) {
            return res.status(400).send('Require either store_id or address.');
        }

        var searchCondition = req.body['store_id'] ? {id: req.body['store_id']} : {address: req.body['address']};

        product.update(req.body, {
            where: searchCondition
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