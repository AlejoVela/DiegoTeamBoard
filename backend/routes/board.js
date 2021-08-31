const BoardController = require("../controllers/board");
const router = require("express").Router();
const multiparty = require("connect-multiparty");
const mult = multiparty();
const Upload = require("../middlewares/file");
const Auth = require("../middlewares/auth");
const ValidateUser = require("../middlewares/validateUser");

router.post(
  "/saveTask",
  Auth,
  ValidateUser,
  BoardController.saveTask
);
router.post(
  "/saveTaskImg",
  mult,
  Upload,
  Auth,
  ValidateUser,
  BoardController.saveTaskImg
);
router.get("/listTask", Auth, ValidateUser, BoardController.listTask);
router.put("/updateTask", Auth, ValidateUser, BoardController.updateTask);
router.delete(
  "/deleteTask/:_id",
  Auth,
  ValidateUser,
  BoardController.deleteTask
);

module.exports = router;