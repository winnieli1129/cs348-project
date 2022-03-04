var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const customer = require('../../models').customer;

/* POST customer registration. */
router.post('/', async function(req, res, next) {
  try {
    const { name, email, phone_number, password } = req.body;

    if (!(name && email && phone_number && password)) {
      return res.status(400).send('Require name, email, phone_number, and password');
    }

    const oldUser = await customer.findOne({
      where: {
        email: email
      }
    });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await customer.create({
      name: name,
      email: email,
      phone_number: phone_number,
      password: encryptedPassword
    });

    return res.status(201).json(user);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;