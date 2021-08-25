const BoardController = require("../controllers/board");
const router = require("express").Router();
const multiparty = require("connect-multiparty");
const mult = multiparty();
const Upload = require("../middlewares/file");
const Auth = require("../middlewares/auth");
const ValidateUser = require("../middlewares/validateUser");

router.post(
  "/saveTask",
  mult,
  Upload,
  Auth,
  ValidateUser,
  BoardController.saveTask
);
router.get("/listTask", Auth, ValidateUser, BoardController.listTask);
router.put("/updateRole", Auth, ValidateUser, BoardController.updateTask);
router.delete(
  "/deleteTask:_id?",
  Auth,
  ValidateUser,
  BoardController.deleteTask
);

module.exports = router;