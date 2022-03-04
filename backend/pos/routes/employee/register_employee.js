var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const employee = require('../../models').employee;

/* POST employee registration. */
router.post('/', async function(req, res, next) {
  try {
    const { store_id, name, email, password } = req.body;

    if (!(store_id && name && email && password)) {
      return res.status(400).send('Require store_id, name, email, and password');
    }

    const old_employee = await employee.findOne({
      where: {
        email: email
      }
    });
    if (old_employee) {
      return res.status(409).send('Employee Already Exist. Please Login');
    }

    encryptedPassword = await bcrypt.hash(password, 10);
    const new_employee = await employee.create({
      store_id: store_id,
      name: name,
      email: email,
      password: encryptedPassword
    });

    return res.status(201).json(new_employee);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;