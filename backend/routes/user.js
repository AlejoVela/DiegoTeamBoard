const UserController = require("../controllers/user");
const router = require("express").Router();
const Auth = require("../middlewares/auth");
const ValidateUser = require("../middlewares/validateUser");
const Admin = require("../middlewares/admin");

router.post("/createUser", UserController.createUser);
router.post("/login", UserController.login);
router.post(
  "/createAdmin",
  Auth,
  ValidateUser,
  Admin,
  UserController.createAdmin
);
router.get(
  "/listUser/:name?",
  Auth,
  ValidateUser,
  Admin,
  UserController.listUser
);
router.put("/updateUser", Auth, ValidateUser, Admin, UserController.updateUser);
router.put("/deleteUser", Auth, ValidateUser, Admin, UserController.deleteUser);

module.exports = router;
