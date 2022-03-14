var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const employee = require('../../models').employee;
const auth = require('../../middleware/auth');

/* POST delete store. */
router.post('/', auth, async function(req, res, next) {
try{
    if (req.user.employee !== true) {
        return res.status(401).send('Unauthorized User');
    }

    const { store_id } = req.body;

    if(!store_id) {
        return res.status(400).send('Require store_id');
    }

    // await employee.destroy({
    //     where: { store_id: store_id }
    // });

    store.destroy({
        where: { id: store_id }
    }).then(store => {
        if (!store) {
            return res.status(404).send({error: 'Store not found'});
        }

        return res.status(200).send();
    });
} catch(err) {
    console.log(err);
}
});

module.exports = router;