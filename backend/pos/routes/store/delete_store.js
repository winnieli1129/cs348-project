var express = require('express');
var router = express.Router();

const store = require('../../models').store;
const { QueryTypes } = require('sequelize');
const db = require('../../models/index');
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

		await db.sequelize.query(`DELETE FROM \`stores\` WHERE \`id\`=:id;`, { replacements: {id: store_id}, type: QueryTypes.DELETE });
		
		return res.status(200).send();
	} catch(err) {
		console.log(err);
	}
});

module.exports = router;