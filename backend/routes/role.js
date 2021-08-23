const router = require('express').Router();
const RoleController = require('../controllers/role');

router.post('/createtRole', RoleController.createRole);
router.put('/updateRole', RoleController.updateRole);
router.get('/listRole', RoleController.listRole);

module.exports = router;