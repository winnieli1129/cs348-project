var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const employee = require('../../models').employee;
const auth = require('../../middleware/auth');

/* POST update employee. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    if (!req.body.hasOwnProperty('employee_id')) {
      return res.status(400).send('Require employee_id');
    }

    const employee_id = req.body['employee_id'];
    delete req.body['employee_id']
    if (req.body.hasOwnProperty('password')) {
      encryptedPassword = await bcrypt.hash(req.body['password'], 10);
      req.body['password'] = encryptedPassword;
    }
    
    employee.update(req.body, {
        where: {
          id: employee_id
        }
    }).then(user => {
      if (user == 0) {
        console.log("id:", employee_id);
        return res.status(404).send({error: 'Employee not found'});
      }

      return res.status(200).send();
    });

  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;