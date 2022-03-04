var express = require('express');
var router = express.Router();

const employee = require('../models').employee;
const auth = require('../middleware/auth');

/* GET retrieve employee with id. */
router.get('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }

    const { employee_id } = req.body;

    if (!employee_id) {
      return res.status(400).send('Required employee_id');
    }
    const user = await employee.findOne({
      where: {
        id: employee_id
      }
    });
    if (!user) {
      return res.status(404).send('Employee Didn\'t Exist.');
    }

    return res.status(200).json(user);
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;