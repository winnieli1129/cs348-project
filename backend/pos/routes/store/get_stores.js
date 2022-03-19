var express = require('express');
var router = express.Router();

const { QueryTypes } = require('sequelize');
const db = require('../../models/index');

/* GET retrieve all stores. */
router.get('/', async function(req, res, next){
  try{
    const s = await db.sequelize.query(`SELECT * FROM \`stores\`;`, { type: QueryTypes.SELECT });

    return res.status(200).json(s);
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;