var express = require('express');
var router = express.Router();

const employee = require('../../models').employee;
const auth = require('../../middleware/auth');

/* POST delete employee. */
router.post('/', auth, async function(req, res, next) {
  try {
    if (req.user.employee !== true) {
      return res.status(401).send('Unauthorized User');
    }
    
    const { employee_id } = req.body;

    if (!employee_id) {
      return res.status(400).send('Require employee_id');
    }

    employee.destroy({
      where: {
        id: employee_id
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({error: 'Employee not found'});
      }

      return res.status(200).send();
    });
  } catch(err) {
    console.log(err);
  }
});
  
module.exports = router;