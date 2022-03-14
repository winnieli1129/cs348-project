var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const employee = require('../../models').employee;
const store = require('../../models').store;

/* POST employee registration. */
router.post('/', async function(req, res, next) {
  try {
    const { store_id, name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(400).send('Require name, email, and password');
    }

    const old_employee = await employee.findOne({
      where: {
        email: email
      }
    });
    if (old_employee) {
      return res.status(409).send('Employee Already Exist. Please Login');
    }

    if (store_id) {
      const s = await store.findOne({
        where: {
          id: store_id
        }
      });
      if (!s) {
        return res.status(409).send('Store doesn\'t exists');
      }
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