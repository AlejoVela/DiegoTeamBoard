const router = require("express").Router();
const RoleController = require("../controllers/role");
const Auth = require("../middlewares/auth");
const ValidateUser = require("../middlewares/validateUser");
const Admin = require("../middlewares/admin");

router.post(
  "/createtRole",
  Auth,
  ValidateUser,
  Admin,
  RoleController.createRole
);
router.put("/updateRole", Auth, ValidateUser, Admin, RoleController.updateRole);
router.get("/listRole", Auth, ValidateUser, Admin, RoleController.listRole);

module.exports = router;