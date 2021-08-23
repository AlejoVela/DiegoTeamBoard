const BoardController = require('../controllers/board');
const router = require('express').Router();
const multiparty = require("connect-multiparty");
const mult = multiparty();

router.post('/saveTask', mult, BoardController.saveTask);
router.get('/listTask', BoardController.listTask);
rotuer.put('/updateRole', BoardController.updateTask);
router.delete('/deleteTask:_id?', BoardController.deleteTask);

module.exports = router;