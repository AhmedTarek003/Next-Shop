const router = require("express").Router();
const {
  createNewUserCrrl,
  loginUserCrrl,
  getUserCtrl,
  logoutUserCtrl,
  createNewAdminCrrl,
} = require("../controllers/authCtrl");
const { verifyAndRefreshToken } = require("../middlewares/tokenHandler");
const {
  createNewUserValidator,
  loginUserValidator,
} = require("../utils/validators/userValidate");

router.post("/create_user", createNewUserValidator, createNewUserCrrl);
router.post("/create_admin", createNewUserValidator, createNewAdminCrrl);
router.post("/login_user", loginUserValidator, loginUserCrrl);
router.get("/get_user", verifyAndRefreshToken, getUserCtrl);
router.post("/logout_user", logoutUserCtrl);

module.exports = router;
