var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

const config = process.env;

/* GET check jwt token */
router.get('/', async function(req, res, next) {
  try{
    const jwt_token = req.headers['authorization'];

    if(!jwt_token) {
      return res.status(400).send('Require jwt_token');
    }

    try {
      const decoded = jwt.verify(jwt_token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send(false);
    }

    return res.status(200).json(true);
  } catch(err) {
      console.log(err);
  }
});

module.exports = router;