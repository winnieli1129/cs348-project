var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employee = require('../../models').employee;

/* POST employee login. */
router.post('/', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('Required email and password');
    }
    const user = await employee.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(404).send('Employee Didn\'t Exist. Please Register');
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
          employee: true
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );

      return res.status(200).json({
        employee_id: user.id,
        jwt_token: token
      });
    }

    return res.status(400).send('Invalid Credentials');
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;