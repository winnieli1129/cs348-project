var express = require('express');
var router = express.Router();

const { QueryTypes } = require('sequelize');
const db = require('../../models/index');

/* GET retrieve store with id */
router.get('/', async function(req, res, next) {
  try{

    const { store_id } = req.query;

    if(!store_id) {
      return res.status(400).send('Require store_id');
    }

    const s = await db.sequelize.query(`SELECT * FROM \`stores\` WHERE \`id\`=:id;`, { replacements: {id: store_id}, type: QueryTypes.SELECT });
    if(s.length === 0) {
      return res.status(404).send('Store does not exist.');
    }

    return res.status(200).json(s);
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;