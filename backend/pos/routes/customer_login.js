var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customer = require('../models').customer;

/* POST customer login. */
router.post('/', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("Required email and password");
    }
    const user = await customer.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(409).send('User Didn\'t Exist. Please Register');
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          customer_id: user.id,
          email: user.email,
          password: user.password
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      console.log(token);

      return res.status(200).json({
        customer_id: user.id,
        jwt_token: token
      });
    }

    return res.status(400).send("Invalid Credentials");
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;